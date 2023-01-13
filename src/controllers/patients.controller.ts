import { Request, Response } from 'express';
import { CONSTRAINTS, HEADERS, IData, IFieldNames, SORT_ORDER } from '../types';
import { ApiResponder, splitAndFilterNulls } from '../utils';

import { default as data } from '../database/data.json';
export const getPatients = async (request: Request, response: Response) => {
  const sar = new ApiResponder(request, response);

  try {
    const params = request.query as unknown as {
      fields: string;
      sort: string;
      filters: string;
    };

    const { fields, sort, filters } = params;
    /*
(attr=thalach,eq=28,gte=29)(attr=age,eq=28,gte=90)
*/
    const filterArr = ((filters || '').trim().match(/\(([^)]+)\)/g) || []).map(
      (str: any) => {
        const parenRemovedString =
          (str || '').trim().substring(1, str.length - 1) || '';
        const constraints = splitAndFilterNulls(parenRemovedString, ',');
        const header = splitAndFilterNulls(
          constraints[0],
          'attr='
        )[0] as IFieldNames;
        if (!(constraints[0].startsWith('attr=') && HEADERS.includes(header))) {
          throw new Error(
            'Constraint mismatch: Please pass your filter in this format: (attr=thalach,eq=28,gte=29)(attr=age,eq=28,gte=90)'
          );
        }

        const toReturn = {
          prop: header,
          filterFns: [],
        };

        for (const constraint of constraints.slice(1)) {
          const splits = splitAndFilterNulls(constraint || '', '=');
          switch (splits[0]) {
            case 'eq': {
              toReturn.filterFns.push(
                (row: any) => +row[header] === +splits[1]
              );
              break;
            }
            case 'gte': {
              toReturn.filterFns.push((row: any) => +row[header] >= +splits[1]);
              break;
            }
            case 'lte': {
              toReturn.filterFns.push((row: any) => +row[header] <= +splits[1]);
              break;
            }
            case 'lt': {
              toReturn.filterFns.push((row: any) => +row[header] < +splits[1]);
              break;
            }
            case 'gt': {
              toReturn.filterFns.push((row: any) => +row[header] > +splits[1]);
              break;
            }
            default: {
              throw new Error(
                `Constraint mismatch: ${constraint}. Pass your constraints for filter as one of these: ${CONSTRAINTS.join(
                  '=,'
                )}`
              );
            }
          }
        }
        return toReturn;
      }
    );

    /*
        filtersArr is expected to be: 
        [
          {
            prop: 'thalach'
            filterFns: [() => {}]
          }, 
          {
            prop: 'age',
            filterFns: [() => {}]
          }
        ]
      */

    let filteredData = [...data] as IData;
    for (const condition of filterArr) {
      for (const filterFn of condition.filterFns) {
        filteredData = [...filteredData.filter(filterFn)];
      }
    }

    const fieldsArray = splitAndFilterNulls((fields || '').trim(), ',').map(
      (f) => f.trim()
    ) as Array<IFieldNames>;

    const unrecognizedFields = fieldsArray.filter(
      (f) => HEADERS.indexOf(f) === -1
    );

    if (unrecognizedFields.length) {
      return sar.sendApiRes({
        error: { code: 401, message: 'unrecognied field passed' },
      });
    }

    if (fieldsArray.length) {
      // filter out fileds
      filteredData = filteredData.map((row) => {
        return fieldsArray.reduce((acc, cur) => {
          acc[`${cur}`] = row[cur];
          return acc;
        }, {});
      }) as IData;
    }

    if (!!sort) {
      const [sortProp, sortOrder] = splitAndFilterNulls(sort, ',');
      const matchingSortProp = HEADERS.find((v) => v === sortProp);

      if (!matchingSortProp) {
        return sar.sendApiRes({
          error: {
            code: 401,
            message: 'unrecognied field passed for sorting.',
          },
        });
      }

      const matchingSortOrder = SORT_ORDER.find((v) => v === sortOrder);

      if (!matchingSortOrder) {
        return sar.sendApiRes({
          error: {
            code: 401,
            message: 'unrecognied sort order passed. allowed (ASC or DESC)',
          },
        });
      }

      if (sortOrder === 'asc') {
        filteredData.sort((a, b) => a[sortProp] - b[sortProp]);
      } else {
        filteredData.sort((a, b) => b[sortProp] - a[sortProp]);
      }
    }

    sar.sendApiRes<any>({ data: filteredData });
  } catch (error) {
    return sar.sendApiRes({ error: { code: 500, message: error.message } });
  }
};
