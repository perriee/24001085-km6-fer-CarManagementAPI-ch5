## Car Management Dashboard

Challenge Chapter 4 - Binar Academy

![dashboard](public/images/dashboard.png)

#### Dashboard Features
- Showing All Cars
- Filter Car by Size
- Search Car by Name
- Responsive Web Design

## ERDiagram

![db diagram](public/images/ERD-Challenge-Chapter4.png)

## Tech Stack
- [Express.js](https://expressjs.com)
- [Sequelize](https://sequelize.org/)
- [Redis](https://redis.io/docs/)
- [PostgreSQL](https://www.postgresql.org/)
- [Cloudinary](https://cloudinary.com/)
- [Flowbite](https://flowbite.com/)

## Installation

#### 1. Clone Repository

```
git clone https://github.com/perriee/24001085-km6-fer-CarManagementDashboard-ch4.git
```

#### 2. Install Depencencies

```
npm install
```

#### 3. Copy .env.example file

```
cp .env.example .env
```

#### 4. Start Server

```
npm run dev
```

#### 4. Access Port

by default server running in `localhost:3000`

## API Reference

### Car Endpoints

| Route           | Method   | Description      |
| --------------- | -------- | ---------------- |
| `/api/cars`     | `GET`    | Get all cars     |
| `/api/cars`     | `POST`   | Create car       |
| `/api/cars/:id` | `GET`    | Get car by ID    |
| `/api/cars/:id` | `PUT`    | Update car by ID |
| `/api/cars/:id` | `DELETE` | Delete car by ID |

### Manufacture Endpoints

| Route                   | Method   | Description              |
| ----------------------- | -------- | ------------------------ |
| `/api/manufactures`     | `GET`    | Get all manufactures     |
| `/api/manufactures`     | `POST`   | Create manufacture       |
| `/api/manufactures/:id` | `GET`    | Get manufacture by ID    |
| `/api/manufactures/:id` | `PUT`    | Update manufacture by ID |
| `/api/manufactures/:id` | `DELETE` | Delete manufacture by ID |

### Type Endpoints

| Route            | Method   | Description       |
| ---------------- | -------- | ----------------- |
| `/api/types`     | `GET`    | Get all types     |
| `/api/types`     | `POST`   | Create type       |
| `/api/types/:id` | `GET`    | Get type by ID    |
| `/api/types/:id` | `PUT`    | Update type by ID |
| `/api/types/:id` | `DELETE` | Delete type by ID |

### Size Endpoints

| Route            | Method   | Description       |
| ---------------- | -------- | ----------------- |
| `/api/sizes`     | `GET`    | Get all sizes     |
| `/api/sizes`     | `POST`   | Create size       |
| `/api/sizes/:id` | `GET`    | Get size by ID    |
| `/api/sizes/:id` | `PUT`    | Update size by ID |
| `/api/sizes/:id` | `DELETE` | Delete size by ID |

### Transmission Endpoints

| Route                    | Method   | Description               |
| ------------------------ | -------- | ------------------------- |
| `/api/transmissions`     | `GET`    | Get all transmissions     |
| `/api/transmissions`     | `POST`   | Create transmission       |
| `/api/transmissions/:id` | `GET`    | Get transmission by ID    |
| `/api/transmissions/:id` | `PUT`    | Update transmission by ID |
| `/api/transmissions/:id` | `DELETE` | Delete transmission by ID |
