// @ts-ignore
module.exports = async (payload, helpers) => {
  const { success } = payload;
  if (success) {
    helpers.logger.info(`Test status: success`);
  } else {
    helpers.logger.info(`Test status: failed`);
  }
};
