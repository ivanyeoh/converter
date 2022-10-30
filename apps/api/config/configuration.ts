export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  msgraph: {
    tenantId: process.env.MSGRAPH_TENANT_ID,
    clientId: process.env.MSGRAPH_CLIENT_ID,
    clientSecret: process.env.MSGRAPH_CLIENT_SECRET,
    upload: {
      userId: process.env.MSGRAPH_UPLOAD_USER_ID,
      dirId: process.env.MSGRAPH_UPLOAD_DIR_ID,
    },
  },
});
