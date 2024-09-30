# cdn-demo
Demo using GCP CDN


1. Initialize NPM

```shell
npm init -y
```

2. Install Depedencies

```shell
npm install express ejs
npm install @google-cloud/storage
```

3. Create a bucket with a foobar name. Bucket should be public. Structure of bucket should be /images and /videos on root. Save each content in corresponding directory
4. Configure the bucket name in configMap.yaml, on entry: GCS_BUCKET
5. Create a CDN. When prompted, create a LoadBalancer, to front end the bucket. Save the IP or create a DNS Record of it
6. Configure the CDN endpoint in configMap, on entry: CDN_BASE_URL