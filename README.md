# Assessment Questions

## Back-end Questions

## 1. **Designing a New API for Real-Time Data Aggregation**

**Scenario**:\
The system currently consists of three microservices: Customer API, Master Data API, and Transaction Data API. A new feature requires data from all three microservices to be displayed in near real-time. The stack includes REST APIs and an RDBMS database.

**Solution Approaches**:

1. **API Gateway with Parallel Requests**:

   - Use an API Gateway to make parallel calls to all three services.
   - Leverage a connection pool to optimize resource utilization and minimize response time.

2. **Event-Driven Architecture**:

   - Implement a message broker like RabbitMQ.
   - Use an event-driven approach where APIs subscribe to events and pre-aggregate the responses for near real-time data delivery.

---

## 2. **Performance Test Strategy Plan**

To ensure optimal performance for the project release, follow these steps:

1. **Define Goals and Benchmarks**:

   - Establish acceptable response times and performance goals.
   - Identify critical business logic to focus on.

2. **Develop a Detailed Test Plan**:

   - **Load Testing**: Assess system behavior under normal and peak loads.
   - **Stress Testing**: Identify system limits by testing beyond maximum capacity.
   - **Endurance Testing**: Evaluate performance over an extended period.

3. **Identify and Resolve Bottlenecks**:

   - Analyze results to pinpoint performance issues.
   - Optimize system components to enhance performance.

---

## 3. **Developing APIs Using NestJS and PostgreSQL**

### **Steps to Run the Project**

1. Clone the repository and navigate to the project directory:

   ```bash
   cd ./test
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Create a local PostgreSQL database named `products_db`, or configure a custom database by creating a `.env` file in the project root (`/test/test/`):

   ```env
   DB_HOST=
   DB_PORT=
   DB_USERNAME=
   DB_PASSWORD=
   DB_NAME=
   ```

4. Run TypeORM migrations to set up the database schema:

   ```bash
   npm run migration:run
   ```

5. Start the NestJS server:

   ```bash
   npm run start
   ```

6. Run tests using Jest:

   ```bash
   npm run test
   ```

---

### **Validation**

- **Library Used**: `class-validator`
- **Implementation**: DTOs are validated using `ValidationPipe`, which is applied globally to handle automatic validation.

---

### **Database Design**

#### **Products Table**

- **Columns**:
  - `id` (Primary Key)
  - `created_at` (Timestamp)
  - `updated_at` (Timestamp)

#### **Product_Translations Table**

- **Columns**:
  - `id` (Primary Key)
  - `product_id` (Foreign Key referencing `products.id`)
  - `language` (Language code, e.g., `en`, `fr`)
  - `name` (Indexed for full-text search)
  - `description` (Nullable)
  - `created_at` (Timestamp)
  - `updated_at` (Timestamp)

#### **Entity Relationships**

1. **One-to-Many**:
   - A product has multiple translations (`ProductTranslation`).
   - Each `ProductTranslation` links back to its parent product.
2. **Cascade Operations**:
   - Deleting a product automatically deletes its translations (`CASCADE`).
   - Changes to translations propagate back to the product entity.

---

### **Testing Strategy**

1. Test controllers and services in isolation.
2. Validate pagination logic for APIs.
3. Verify response transformations and data structure.
4. Ensure full-text search functionality is working as expected.

---

### **Additional Features**

- **API Documentation**:
  - Swagger is used for API documentation.
  - Accessible at: [http://localhost:3000/api](http://localhost:3000/api)

## Front-end Questions

## 1. **useCallback usage in React**

        useCallback คือ hooks ที่ใช้ในการป้องกันการ render อัตโนมัติใน React โดยใช้เมื่อเรามี state หรือ props ที่เป็นฟังก์ชันที่ต้องการใช้ใหม่ใน hooks อื่นๆ ในการ render อัตโนมัติ โดยสามารถกำหนดการ re-render ด้วยการกำหนด state ใน array dependencies ([] หมายถึงไม่ re-render)

## 2. **test for react component**

### **Steps to Run the Test**

1. Clone the repository and navigate to the project directory:

   ```bash
   cd ./react-testing
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Run tests using Jest:

   ```bash
   npm run test
   ```
