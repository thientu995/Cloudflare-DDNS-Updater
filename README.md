# Cloudflare Dynamic DNS IP Updater K8s

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.9. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


# Deploy Coolify Cloud

Add Project -> Public Git repository:
<img width="1649" height="905" alt="image" src="https://github.com/user-attachments/assets/e3017e0f-9708-4838-bc4e-23d5d775a9cf" />

Change Build pack to Dockerfile:
<img width="1677" height="435" alt="image" src="https://github.com/user-attachments/assets/90f6f8bd-e816-4329-b44b-ccec214d2f8e" />

Click Countine, after remove all Domain:
<img width="1697" height="633" alt="image" src="https://github.com/user-attachments/assets/ee1154b9-d9a6-4627-a9a0-c875c5892c2a" />

Add key-value Environment variables: CF_ZONE_ID, CF_API_TOKEN, and CF_RECORD_NAME.
<img width="1702" height="738" alt="image" src="https://github.com/user-attachments/assets/d73afe11-a6f1-45d7-8549-c9ea13990362" />

Finish DEPLOY

Test: restart vps auto gen IP
