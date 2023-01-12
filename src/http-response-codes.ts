export type IMessageCodeTypes = 'PROMO_CODE_IS_EXPIRED';

export type TErrorMessages = {
  [key in IMessageCodeTypes]: string;
};
export const statusCodes = {
  OK: 200,
};

export const messageCodes: Partial<TErrorMessages> = {
  PROMO_CODE_IS_EXPIRED: 'This promo code is expired',
};
