const isS3 = env("DO_SPACE_SECRET_KEY") && env("DO_SPACE_ENDPOINT")

export default ({ env }) => ({
  upload: {
    config: isS3
      ? {
          provider: "aws-s3",
          providerOptions: {
            rootPath: env("DO_SPACE_PATH"),
            credentials: {
              accessKeyId: env("DO_SPACE_ACCESS_KEY"),
              secretAccessKey: env("DO_SPACE_SECRET_KEY"),
            },
            region: env("DO_SPACE_REGION"),
            endpoint: env("DO_SPACE_ENDPOINT"),
            params: {
              Bucket: env("DO_SPACE_BUCKET"),
            },
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        }
      : {
          providerOptions: {
            localServer: {
              maxage: 300000,
            },
          },
        },
  },
})
