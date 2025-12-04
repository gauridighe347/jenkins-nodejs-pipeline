## 🔧 Prerequisites

### 1️⃣ EC2 Instance Requirements
- Ubuntu 20.04 or 22.04 EC2 Instance (t2.medium or higher recommended)
- Minimum **20GB EBS** storage (required for Docker + Minikube)
- Security Group must allow:
  - Port **22** → SSH
  - Port **8080** → Jenkins (if used)
  - Port **30080** → NodePort Service
  - Outbound Internet access (for Docker pulls)

  ![Website Screenshot](assets/instance.jpginstance.png)

  Security Groups

  ![Website Screenshot](assets/Screenshot%202025-11-18%20000240.png)

### 2️⃣ Tools Installed on EC2
- **Docker**
- **Minikube** (running with Docker/Containerd)
- **kubectl**
- **containerd** or Docker runtime enabled

### 3️⃣ Jenkins Server Requirements
- Jenkins installed (local or on EC2)
- Jenkins must have:
  - Docker CLI installed
  - Pipeline plugins enabled
  - Node.js (optional for lint/test)

### 4️⃣ Jenkins Credentials Needed
- **Docker Hub Credentials**
  - ID: `docker-crediantials`
  - Type: Username + Password
- **EC2 SSH Key**
  - ID: `ec2-ssh-key`
  - Type: SSH Username with private key  
  - Username: `ubuntu`

  
![Website Screenshot](assets/Screenshot%202025-11-18%20000635.png)


## 🧪 Testing with Jest

This project uses **Jest + Supertest** to automatically test the Node.js API during the CI/CD pipeline.

``` bash
npm install jest
```

### Purpose of Testing
- Ensures the API is working before building and deploying.
- Prevents broken code from reaching Docker Hub or Kubernetes.
- Jenkins pipeline runs tests automatically in the "Run Tests" stag

## GitHub Auto-Build (Webhook)

``` bash
Enable in GitHub:  
**Settings → Webhooks → Add Webhook → Push Events → Save**
```

This pipeline auto-builds on every GitHub push using a webhook pointing to Jenkins:

## Jenkins Pipeline build successful

![Website Screenshot](assets/Screenshot%202025-11-18%20000329.png)


## Verfiy pods on EC2 Instance

![Website Screenshot](assets/Screenshot%202025-11-18%20001213.png)


##  Port Forward to access application

```bash
kubectl port-forward --address 0.0.0.0 svc/nodejs-demo-service 3000:3000
```

Access the app

```bash
http://<EC2_PUBLIC_IP>:3000/
```
![Website Screenshot](assets/Screenshot%202025-11-18%20000250.png)

