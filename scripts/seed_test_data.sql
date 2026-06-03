-- ==============================================================================
-- HMT ERP - Database Seeding Script (PostgreSQL)
-- Generates exactly 100 rows of relational test data for each of the 57 tables.
-- Run this script in DBeaver (or any PostgreSQL client) connected to your database.
-- ==============================================================================

-- 1. Temporarily disable foreign key constraints and triggers to allow clean truncation and out-of-order inserts
SET session_replication_role = 'replica';

-- 2. Clean existing data in all tables
TRUNCATE TABLE 
  notifications,
  audit_logs,
  reports,
  widgets,
  dashboards,
  emails,
  lead_sources,
  campaign_leads,
  campaigns,
  resources,
  tasks,
  milestones,
  projects,
  taxes,
  bank_accounts,
  expenses,
  chart_of_accounts,
  purchase_order_items,
  purchase_orders,
  suppliers,
  stock_adjustments,
  stock_movements,
  warehouses,
  products,
  product_categories,
  payments,
  invoices,
  sales_order_items,
  sales_orders,
  quotation_items,
  quotations,
  activities,
  opportunities,
  contacts,
  customers,
  leads,
  evaluations,
  interviews,
  candidates,
  employee_history,
  contracts,
  payrolls,
  leave_rejections,
  leaves,
  attendances,
  employees,
  positions,
  departments,
  branches,
  companies,
  roles,
  user_roles,
  password_reset_tokens,
  verification_tokens,
  sessions,
  accounts,
  users
CASCADE;

-- 3. Seeding users (password is standard bcrypt hash for '123456')
INSERT INTO users (id, name, email, "emailVerified", image, password, "isActive", "mfaEnabled", "mfaSecret", "lastLoginAt", "createdAt", "updatedAt")
SELECT 
  'user-' || i,
  'User Name ' || i,
  'user' || i || '@example.com',
  NOW() - (i || ' days')::interval,
  'https://api.dicebear.com/7.x/avataaars/svg?seed=user' || i,
  '$2a$10$.5Elh8fgxypNUWhpUUr/xOa2sZm0VIaE0qWuGGl9otUfobb46T1Pq', -- bcrypt hash for 123456
  true,
  false,
  NULL,
  NOW() - (i || ' hours')::interval,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 4. Seeding roles
INSERT INTO roles (id, name, description, permissions, "createdAt", "updatedAt")
SELECT 
  'role-' || i,
  'Role ' || i,
  'Description for Role ' || i,
  '{"read:all": true, "write:all": false}'::jsonb,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 5. Seeding user_roles
INSERT INTO user_roles (id, "userId", "roleId")
SELECT 
  'user-role-' || i,
  'user-' || i,
  'role-' || i
FROM generate_series(1, 100) s(i);

-- 6. Seeding accounts
INSERT INTO accounts (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state)
SELECT 
  'account-' || i,
  'user-' || i,
  'oauth',
  'google',
  'google-oauth-id-' || i,
  'refresh_token_' || i,
  'access_token_' || i,
  3600,
  'Bearer',
  'openid email profile',
  'id_token_' || i,
  NULL
FROM generate_series(1, 100) s(i);

-- 7. Seeding sessions
INSERT INTO sessions (id, "sessionToken", "userId", expires)
SELECT 
  'session-' || i,
  'session-token-' || i,
  'user-' || i,
  NOW() + interval '30 days'
FROM generate_series(1, 100) s(i);

-- 8. Seeding verification_tokens
INSERT INTO verification_tokens (identifier, token, expires)
SELECT 
  'identifier-' || i,
  'token-' || i,
  NOW() + interval '24 hours'
FROM generate_series(1, 100) s(i);

-- 9. Seeding password_reset_tokens
INSERT INTO password_reset_tokens (id, email, token, expires, used, "createdAt")
SELECT 
  'reset-token-' || i,
  'user' || i || '@example.com',
  'reset-token-value-' || i,
  NOW() + interval '2 hours',
  false,
  NOW()
FROM generate_series(1, 100) s(i);

-- 10. Seeding companies (First company is 'default' which is used by the backend fallback)
INSERT INTO companies (id, name, slug, email, phone, address, city, state, country, "postalCode", "taxId", website, logo, "primaryColor", plan, "isActive", "createdAt", "updatedAt")
SELECT 
  CASE WHEN i = 1 THEN 'default' ELSE 'company-' || i END,
  CASE WHEN i = 1 THEN 'Default Company (HMT ERP)' ELSE 'Company ' || i END,
  CASE WHEN i = 1 THEN 'default' ELSE 'company-' || i END,
  'info@company' || i || '.com',
  '+84900000' || LPAD(i::text, 3, '0'),
  'Address ' || i,
  'City ' || i,
  'State ' || i,
  'VN',
  '70000',
  'TAX-' || i,
  'https://company' || i || '.com',
  'https://company' || i || '.com/logo.png',
  '#0070f3',
  'premium',
  true,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 11. Seeding branches (All belong to the 'default' company for multi-tenant mapping)
INSERT INTO branches (id, "companyId", name, code, address, city, state, country, "postalCode", phone, email, "isActive", "createdAt", "updatedAt")
SELECT 
  'branch-' || i,
  'default',
  'Branch ' || i,
  'BR-' || i,
  'Branch Address ' || i,
  'City ' || i,
  'State ' || i,
  'VN',
  '70000',
  '+84910000' || LPAD(i::text, 3, '0'),
  'branch' || i || '@company.com',
  true,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 12. Seeding departments
INSERT INTO departments (id, "companyId", "branchId", name, code, "managerId", "isActive", "createdAt", "updatedAt")
SELECT 
  'department-' || i,
  'default',
  'branch-' || i,
  'Department ' || i,
  'DEPT-' || i,
  NULL, -- Will update later when employees are created
  true,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 13. Seeding positions
INSERT INTO positions (id, "companyId", "departmentId", title, code, description, "salaryMin", "salaryMax", "isActive", "createdAt", "updatedAt")
SELECT 
  'position-' || i,
  'default',
  'department-' || i,
  'Position ' || i,
  'POS-' || i,
  'Description for Position ' || i,
  10000000 + i * 100000,
  30000000 + i * 200000,
  true,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 14. Seeding employees
INSERT INTO employees (
  id, "companyId", "branchId", "departmentId", "positionId", "userId", "employeeCode", "firstName", "lastName", "fullName", 
  email, phone, avatar, "dateOfBirth", gender, address, city, state, country, "postalCode", 
  "idNumber", "idIssueDate", "idIssuePlace", "hireDate", "probationEnd", "terminationDate", status, notes, "createdAt", "updatedAt"
)
SELECT 
  'employee-' || i,
  'default',
  'branch-' || i,
  'department-' || i,
  'position-' || i,
  'user-' || i,
  'EMP-' || i,
  'First' || i,
  'Last' || i,
  'First' || i || ' Last' || i,
  'emp' || i || '@company.com',
  '+84920000' || LPAD(i::text, 3, '0'),
  'https://api.dicebear.com/7.x/avataaars/svg?seed=emp' || i,
  '1990-01-01'::date + (i || ' days')::interval,
  CASE WHEN i % 2 = 0 THEN 'male' ELSE 'female' END,
  'Employee Address ' || i,
  'City ' || i,
  'State ' || i,
  'VN',
  '70000',
  'ID-' || i,
  '2015-01-01'::date,
  'Place ' || i,
  '2020-01-01'::date,
  '2020-03-01'::date,
  NULL,
  'active',
  'Notes for employee ' || i,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- Update department managerIds to point to our newly created employees
UPDATE departments SET "managerId" = 'employee-' || SUBSTRING(id FROM 12);

-- 15. Seeding attendances
INSERT INTO attendances (
  id, "companyId", "employeeId", date, "checkIn", "checkOut", "breakStart", "breakEnd", "totalHours", overtime, status, notes, "createdAt", "updatedAt"
)
SELECT 
  'attendance-' || i,
  'default',
  'employee-' || i,
  '2026-06-03'::date - (i % 5 || ' days')::interval,
  '2026-06-03 08:00:00'::timestamp - (i % 5 || ' days')::interval,
  '2026-06-03 17:30:00'::timestamp - (i % 5 || ' days')::interval,
  '2026-06-03 12:00:00'::timestamp - (i % 5 || ' days')::interval,
  '2026-06-03 13:00:00'::timestamp - (i % 5 || ' days')::interval,
  8.50,
  0.50,
  'present',
  'On time',
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 16. Seeding leaves
INSERT INTO leaves (
  id, "companyId", "employeeId", "leaveType", "startDate", "endDate", "totalDays", reason, status, "approvedById", "approvedAt", "rejectionNote", attachment, "createdAt", "updatedAt"
)
SELECT 
  'leave-' || i,
  'default',
  'employee-' || i,
  CASE WHEN i % 3 = 0 THEN 'sick' WHEN i % 3 = 1 THEN 'annual' ELSE 'unpaid' END,
  '2026-07-01'::date + (i || ' days')::interval,
  '2026-07-03'::date + (i || ' days')::interval,
  3.0,
  'Leave reason ' || i,
  'approved',
  'employee-' || CASE WHEN i = 100 THEN 1 ELSE i + 1 END,
  NOW(),
  NULL,
  'https://company.com/files/leave_' || i || '.pdf',
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 17. Seeding leave_rejections
INSERT INTO leave_rejections (id, "leaveId", "userId", reason, "createdAt")
SELECT 
  'leave-rejection-' || i,
  'leave-' || i,
  'user-' || i,
  'Rejection reason ' || i,
  NOW()
FROM generate_series(1, 100) s(i);

-- 18. Seeding payrolls
INSERT INTO payrolls (
  id, "companyId", "employeeId", month, year, "basicSalary", allowances, deductions, tax, "netSalary", "paymentStatus", "paymentDate", notes, "createdAt", "updatedAt"
)
SELECT 
  'payroll-' || i,
  'default',
  'employee-' || i,
  5,
  2026,
  15000000 + i * 50000,
  '{"allowances": [{"name": "Lunch", "amount": 500000}]}'::jsonb,
  '{"deductions": [{"name": "Insurance", "amount": 300000}]}'::jsonb,
  500000,
  15700000 + i * 50000,
  'paid',
  '2026-05-31'::date,
  'Payroll for May 2026',
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 19. Seeding contracts
INSERT INTO contracts (
  id, "companyId", "employeeId", type, "startDate", "endDate", salary, terms, "signedAt", "signedBy", "fileUrl", status, "createdAt", "updatedAt"
)
SELECT 
  'contract-' || i,
  'default',
  'employee-' || i,
  'full-time',
  '2025-01-01'::date,
  '2028-01-01'::date,
  20000000 + i * 100000,
  'Standard contract terms ' || i,
  '2024-12-25'::date,
  'CEO Company ' || i,
  'https://company.com/files/contract_' || i || '.pdf',
  'active',
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 20. Seeding employee_history
INSERT INTO employee_history (id, "companyId", "employeeId", action, description, "oldValue", "newValue", "createdById", "createdAt")
SELECT 
  'emp-history-' || i,
  'default',
  'employee-' || i,
  'salary_increase',
  'Basic salary increased',
  '{"salary": 18000000}'::jsonb,
  '{"salary": 20000000}'::jsonb,
  'user-1',
  NOW() - (i || ' days')::interval
FROM generate_series(1, 100) s(i);

-- 21. Seeding candidates
INSERT INTO candidates (id, "companyId", "firstName", "lastName", email, phone, "resumeUrl", "positionId", status, source, notes, "createdAt", "updatedAt")
SELECT 
  'candidate-' || i,
  'default',
  'CandidateFirst' || i,
  'CandidateLast' || i,
  'candidate' || i || '@example.com',
  '+84930000' || LPAD(i::text, 3, '0'),
  'https://company.com/resumes/candidate_' || i || '.pdf',
  'position-' || i,
  'interviewed',
  'LinkedIn',
  'Good candidate ' || i,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 22. Seeding interviews
INSERT INTO interviews (id, "companyId", "candidateId", "employeeId", stage, score, feedback, "interviewAt", status, "createdAt", "updatedAt")
SELECT 
  'interview-' || i,
  'default',
  'candidate-' || i,
  'employee-' || i,
  'Technical Round',
  8 + (i % 3),
  'Good coding skills. Feedback ' || i,
  NOW() - (i || ' hours')::interval,
  'completed',
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 23. Seeding evaluations
INSERT INTO evaluations (id, "companyId", "employeeId", "evaluatedById", period, kpis, rating, comments, "createdAt", "updatedAt")
SELECT 
  'evaluation-' || i,
  'default',
  'employee-' || i,
  'employee-' || CASE WHEN i = 100 THEN 1 ELSE i + 1 END,
  '2026-Q1',
  '{"kpis": [{"name": "Quality", "score": 90}, {"name": "Delivery", "score": 85}]}'::jsonb,
  4.20,
  'Strong performance overall in Q1 ' || i,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 24. Seeding leads
INSERT INTO leads (id, "companyId", "ownerId", "firstName", "lastName", email, phone, source, status, score, notes, "convertedAt", "createdAt", "updatedAt")
SELECT 
  'lead-' || i,
  'default',
  'user-' || i,
  'LeadFirst' || i,
  'LeadLast' || i,
  'lead' || i || '@example.com',
  '+84940000' || LPAD(i::text, 3, '0'),
  'Website',
  'new',
  80,
  'Interested in core products. Lead ' || i,
  NULL,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 25. Seeding customers
INSERT INTO customers (
  id, "companyId", type, "firstName", "lastName", "companyName", email, phone, address, city, state, country, "postalCode", "taxId", website, avatar, status, "totalRevenue", "createdAt", "updatedAt"
)
SELECT 
  'customer-' || i,
  'default',
  'corporate',
  'CustFirst' || i,
  'CustLast' || i,
  'Customer Enterprise ' || i,
  'contact@customer' || i || '.com',
  '+84950000' || LPAD(i::text, 3, '0'),
  'Customer Address ' || i,
  'Hanoi',
  'HN',
  'VN',
  '10000',
  'TAX-CUST-' || i,
  'https://customer' || i || '.com',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=cust' || i,
  'active',
  150000000 + i * 1000000,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 26. Seeding contacts
INSERT INTO contacts (id, "companyId", "customerId", "firstName", "lastName", email, phone, position, "isPrimary", notes, "createdAt", "updatedAt")
SELECT 
  'contact-' || i,
  'default',
  'customer-' || i,
  'ContactFirst' || i,
  'ContactLast' || i,
  'contact' || i || '@customer' || i || '.com',
  '+84960000' || LPAD(i::text, 3, '0'),
  'Purchasing Manager',
  true,
  'Primary contact for customer ' || i,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 27. Seeding opportunities
INSERT INTO opportunities (id, "companyId", "customerId", "leadId", title, value, stage, probability, "closeDate", "lostReason", notes, "createdAt", "updatedAt")
SELECT 
  'opportunity-' || i,
  'default',
  'customer-' || i,
  'lead-' || i,
  'Opportunity for Product Expansion ' || i,
  50000000 + i * 500000,
  'proposal',
  60,
  '2026-12-31'::date,
  NULL,
  'Notes for opportunity ' || i,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 28. Seeding activities
INSERT INTO activities (id, "companyId", "leadId", "customerId", "opportunityId", type, title, description, "dueDate", "completedAt", priority, status, "createdById", "createdAt", "updatedAt")
SELECT 
  'activity-' || i,
  'default',
  'lead-' || i,
  'customer-' || i,
  'opportunity-' || i,
  'call',
  'Follow up call ' || i,
  'Discussing the pricing proposal ' || i,
  NOW() + (i || ' hours')::interval,
  NULL,
  'high',
  'pending',
  'user-1',
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 29. Seeding quotations
INSERT INTO quotations (id, "companyId", "customerId", "quotationNumber", "issueDate", "expiryDate", subtotal, discount, "discountType", "taxAmount", total, currency, status, notes, terms, "createdAt", "updatedAt")
SELECT 
  'quotation-' || i,
  'default',
  'customer-' || i,
  'QT-' || i,
  '2026-05-01'::date - (i || ' days')::interval,
  '2026-06-01'::date - (i || ' days')::interval,
  120000000 + i * 100000,
  10000000,
  'fixed',
  11000000,
  121000000 + i * 100000,
  'VND',
  'sent',
  'Quotation notes ' || i,
  'Payment terms: 30 days net.',
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 30. Seeding product_categories
INSERT INTO product_categories (id, "companyId", name, code, "parentId", "isActive", "createdAt", "updatedAt")
SELECT 
  'category-' || i,
  'default',
  'Category ' || i,
  'CAT-' || i,
  NULL,
  true,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 31. Seeding products
INSERT INTO products (id, "companyId", "categoryId", sku, barcode, name, description, "costPrice", "sellingPrice", "minStock", "maxStock", unit, weight, image, "isActive", "createdAt", "updatedAt")
SELECT 
  'product-' || i,
  'default',
  'category-' || i,
  'SKU-' || i,
  'BAR-' || i,
  'Product ' || i,
  'High quality product ' || i,
  50000 + i * 1000,
  90000 + i * 2000,
  10.0,
  500.0,
  'pcs',
  1.5,
  'https://company.com/products/prod_' || i || '.jpg',
  true,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 32. Seeding quotation_items
INSERT INTO quotation_items (id, "quotationId", "productId", description, quantity, "unitPrice", discount, total, "createdAt", "updatedAt")
SELECT 
  'quotation-item-' || i,
  'quotation-' || i,
  'product-' || i,
  'Item description ' || i,
  10.0,
  100000 + i * 1000,
  0.0,
  (10.0 * (100000 + i * 1000)),
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 33. Seeding sales_orders
INSERT INTO sales_orders (id, "companyId", "customerId", "quotationId", "orderNumber", "orderDate", "deliveryDate", subtotal, discount, "discountType", "taxAmount", shipping, total, currency, status, notes, "createdAt", "updatedAt")
SELECT 
  'sales-order-' || i,
  'default',
  'customer-' || i,
  'quotation-' || i,
  'SO-' || i,
  '2026-05-15'::date,
  '2026-06-15'::date,
  200000000 + i * 200000,
  0.0,
  'fixed',
  20000000 + i * 20000,
  500000.0,
  220500000 + i * 220000,
  'VND',
  'pending',
  'Sales order notes ' || i,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 34. Seeding sales_order_items
INSERT INTO sales_order_items (id, "salesOrderId", "productId", description, quantity, "unitPrice", discount, total, "createdAt", "updatedAt")
SELECT 
  'sales-order-item-' || i,
  'sales-order-' || i,
  'product-' || i,
  'Sales order item ' || i,
  15.0,
  120000 + i * 1000,
  0.0,
  (15.0 * (120000 + i * 1000)),
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 35. Seeding invoices
INSERT INTO invoices (id, "companyId", "customerId", "salesOrderId", "invoiceNumber", "issueDate", "dueDate", subtotal, discount, "discountType", "taxAmount", total, "paidAmount", currency, status, notes, "createdAt", "updatedAt")
SELECT 
  'invoice-' || i,
  'default',
  'customer-' || i,
  'sales-order-' || i,
  'INV-' || i,
  '2026-05-20'::date,
  '2026-06-20'::date,
  200000000 + i * 200000,
  0.0,
  'fixed',
  20000000 + i * 20000,
  220000000 + i * 220000,
  100000000.0,
  'VND',
  'partial',
  'Invoice notes ' || i,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 36. Seeding payments
INSERT INTO payments (id, "companyId", "invoiceId", amount, "paymentMethod", reference, "paidAt", notes, "createdAt", "updatedAt")
SELECT 
  'payment-' || i,
  'default',
  'invoice-' || i,
  100000000.0,
  'bank_transfer',
  'BANK-REF-' || i,
  NOW() - (i || ' hours')::interval,
  'Partial payment for invoice ' || i,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 37. Seeding warehouses
INSERT INTO warehouses (id, "companyId", "branchId", name, code, address, "managerId", "isActive", "createdAt", "updatedAt")
SELECT 
  'warehouse-' || i,
  'default',
  'branch-' || i,
  'Warehouse ' || i,
  'WH-' || i,
  'Warehouse Address ' || i,
  'employee-' || i,
  true,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 38. Seeding stock_movements
INSERT INTO stock_movements (id, "companyId", "productId", "warehouseId", type, quantity, reference, notes, "createdById", "createdAt", "updatedAt")
SELECT 
  'movement-' || i,
  'default',
  'product-' || i,
  'warehouse-' || i,
  'in',
  100.0,
  'PO-' || i,
  'Initial stock from purchase order ' || i,
  'user-1',
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 39. Seeding stock_adjustments
INSERT INTO stock_adjustments (id, "companyId", "warehouseId", "productId", type, "oldQuantity", "newQuantity", difference, reason, "approvedById", "createdAt", "updatedAt")
SELECT 
  'adjustment-' || i,
  'default',
  'warehouse-' || i,
  'product-' || i,
  'increase',
  50.0,
  55.0,
  5.0,
  'Damaged packaging replacement ' || i,
  'employee-' || i,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 40. Seeding suppliers
INSERT INTO suppliers (id, "companyId", name, email, phone, address, city, state, country, "postalCode", "taxId", website, status, "createdAt", "updatedAt")
SELECT 
  'supplier-' || i,
  'default',
  'Supplier ' || i,
  'sales@supplier' || i || '.com',
  '+84970000' || LPAD(i::text, 3, '0'),
  'Supplier Address ' || i,
  'Ho Chi Minh',
  'HCM',
  'VN',
  '70000',
  'TAX-SUPP-' || i,
  'https://supplier' || i || '.com',
  'active',
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 41. Seeding purchase_orders
INSERT INTO purchase_orders (id, "companyId", "supplierId", "purchaseNumber", "orderDate", "deliveryDate", subtotal, "taxAmount", total, status, notes, "createdAt", "updatedAt")
SELECT 
  'purchase-order-' || i,
  'default',
  'supplier-' || i,
  'PO-' || i,
  '2026-05-01'::date,
  '2026-05-10'::date,
  50000000 + i * 100000,
  5000000 + i * 10000,
  55000000 + i * 110000,
  'completed',
  'Purchase order notes ' || i,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 42. Seeding purchase_order_items
INSERT INTO purchase_order_items (id, "purchaseOrderId", "productId", description, quantity, "unitCost", discount, total, "createdAt", "updatedAt")
SELECT 
  'purchase-order-item-' || i,
  'purchase-order-' || i,
  'product-' || i,
  'Item details ' || i,
  100.0,
  50000 + i * 1000,
  0.0,
  (100.0 * (50000 + i * 1000)),
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 43. Seeding chart_of_accounts
INSERT INTO chart_of_accounts (id, "companyId", code, name, type, "parentId", "isActive", "createdAt", "updatedAt")
SELECT 
  'coa-' || i,
  'default',
  'COA-' || i,
  'Account Name ' || i,
  CASE WHEN i % 5 = 0 THEN 'asset' WHEN i % 5 = 1 THEN 'liability' WHEN i % 5 = 2 THEN 'equity' WHEN i % 5 = 3 THEN 'revenue' ELSE 'expense' END,
  NULL,
  true,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 44. Seeding expenses
INSERT INTO expenses (id, "companyId", category, amount, description, "accountId", "paidTo", "paymentMethod", "receiptUrl", "expenseDate", "createdAt", "updatedAt")
SELECT 
  'expense-' || i,
  'default',
  'Office Supplies',
  1500000 + i * 10000,
  'Bought office furniture ' || i,
  'coa-' || i,
  'Supplier OfficeCorp ' || i,
  'cash',
  'https://company.com/receipts/exp_' || i || '.jpg',
  '2026-05-15'::date,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 45. Seeding bank_accounts
INSERT INTO bank_accounts (id, "companyId", "bankName", "accountName", "accountNumber", branch, currency, balance, "isActive", "createdAt", "updatedAt")
SELECT 
  'bank-account-' || i,
  'default',
  'Vietcombank',
  'Company Bank ' || i,
  'VCB-ACC-' || LPAD(i::text, 10, '0'),
  'Hanoi Branch',
  'VND',
  1000000000 + i * 10000000,
  true,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 46. Seeding taxes
INSERT INTO taxes (id, "companyId", name, code, rate, type, description, "isActive", "createdAt", "updatedAt")
SELECT 
  'tax-' || i,
  'default',
  'VAT ' || i,
  'TAX-' || i,
  10.00,
  'sales',
  'Value Added Tax ' || i,
  true,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 47. Seeding projects
INSERT INTO projects (id, "companyId", name, code, description, "startDate", "endDate", status, progress, budget, "managerId", "createdAt", "updatedAt")
SELECT 
  'project-' || i,
  'default',
  'Project Alpha ' || i,
  'PRJ-' || i,
  'Development of Core Platform ' || i,
  '2026-01-01'::date,
  '2026-12-31'::date,
  'in_progress',
  45.00,
  500000000 + i * 1000000,
  'employee-' || i,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 48. Seeding milestones
INSERT INTO milestones (id, "companyId", "projectId", name, description, "dueDate", "completedAt", status, "createdAt", "updatedAt")
SELECT 
  'milestone-' || i,
  'default',
  'project-' || i,
  'Milestone ' || i || ' Beta Release',
  'Beta release of the project ' || i,
  '2026-06-30'::date,
  NULL,
  'pending',
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 49. Seeding tasks
INSERT INTO tasks (id, "companyId", "projectId", "milestoneId", "assigneeId", title, description, status, priority, "startDate", "dueDate", "completedAt", "createdAt", "updatedAt")
SELECT 
  'task-' || i,
  'default',
  'project-' || i,
  'milestone-' || i,
  'employee-' || i,
  'Implement authentication module ' || i,
  'Create login, registration and password recovery flows for project ' || i,
  'todo',
  'high',
  '2026-06-01'::date,
  '2026-06-15'::date,
  NULL,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 50. Seeding resources
INSERT INTO resources (id, "companyId", "employeeId", name, type, availability, cost, notes, "createdAt", "updatedAt")
SELECT 
  'resource-' || i,
  'default',
  'employee-' || i,
  'Developer Workspace ' || i,
  'Hardware',
  100.00,
  15000000.0,
  'Standard laptop and monitor ' || i,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 51. Seeding campaigns
INSERT INTO campaigns (id, "companyId", name, type, status, "startDate", "endDate", budget, spent, description, "createdById", "createdAt", "updatedAt")
SELECT 
  'campaign-' || i,
  'default',
  'Summer Sale ' || i,
  'email',
  'active',
  '2026-06-01'::date,
  '2026-08-31'::date,
  50000000 + i * 500000,
  12000000.0,
  'Summer email promotion campaign ' || i,
  'user-' || i,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 52. Seeding campaign_leads
INSERT INTO campaign_leads (id, "campaignId", "leadId", "createdAt")
SELECT 
  'campaign-lead-' || i,
  'campaign-' || i,
  'lead-' || i,
  NOW()
FROM generate_series(1, 100) s(i);

-- 53. Seeding lead_sources
INSERT INTO lead_sources (id, "companyId", name, type, "isActive", "createdAt", "updatedAt")
SELECT 
  'lead-source-' || i,
  'default',
  'Source ' || i,
  'social_media',
  true,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 54. Seeding emails
INSERT INTO emails (id, "companyId", "campaignId", "leadId", subject, body, recipient, status, "sentAt", "openedAt", "clickedAt", "createdAt", "updatedAt")
SELECT 
  'email-' || i,
  'default',
  'campaign-' || i,
  'lead-' || i,
  'Welcome to Our Service ' || i,
  'Hello, this is the body of the welcome email ' || i,
  'recipient' || i || '@example.com',
  'sent',
  NOW() - (i || ' hours')::interval,
  NOW() - (i || ' minutes')::interval,
  NULL,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 55. Seeding dashboards
INSERT INTO dashboards (id, "companyId", name, description, "isDefault", layout, "createdAt", "updatedAt")
SELECT 
  'dashboard-' || i,
  'default',
  'Main Dashboard ' || i,
  'Executive dashboard view ' || i,
  true,
  '{"grid": [{"w": 6, "h": 4, "x": 0, "y": 0, "i": "widget-1"}]}'::jsonb,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 56. Seeding widgets
INSERT INTO widgets (id, "dashboardId", type, title, config, position, "createdAt", "updatedAt")
SELECT 
  'widget-' || i,
  'dashboard-' || i,
  'bar_chart',
  'Sales Over Time ' || i,
  '{"chartType": "bar", "metric": "revenue"}'::jsonb,
  '{"w": 6, "h": 4, "x": 0, "y": 0}'::jsonb,
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 57. Seeding reports
INSERT INTO reports (id, "companyId", name, type, config, "isScheduled", schedule, "createdAt", "updatedAt")
SELECT 
  'report-' || i,
  'default',
  'Financial Report Q2 ' || i,
  'financial',
  '{"period": "Q2", "categories": ["revenue", "expenses"]}'::jsonb,
  true,
  '0 0 1 * *',
  NOW() - (i || ' days')::interval,
  NOW()
FROM generate_series(1, 100) s(i);

-- 58. Seeding audit_logs
INSERT INTO audit_logs (id, "companyId", "userId", action, "entityType", "entityId", "oldValue", "newValue", "ipAddress", "userAgent", "createdAt")
SELECT 
  'audit-log-' || i,
  'default',
  'user-' || i,
  'update_profile',
  'User',
  'user-' || i,
  '{"name": "Old Name"}'::jsonb,
  '{"name": "New Name"}'::jsonb,
  '192.168.1.' || i,
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
  NOW() - (i || ' hours')::interval
FROM generate_series(1, 100) s(i);

-- 59. Seeding notifications
INSERT INTO notifications (id, "userId", type, title, message, data, "isRead", "createdAt")
SELECT 
  'notification-' || i,
  'user-' || i,
  'system',
  'Welcome to HMT ERP',
  'Your account has been successfully set up.',
  '{"welcome": true}'::jsonb,
  false,
  NOW() - (i || ' hours')::interval
FROM generate_series(1, 100) s(i);

-- 60. Restore normal trigger and constraint behavior
SET session_replication_role = 'origin';

-- ==============================================================================
-- End of Script. 100 rows inserted per table successfully.
-- ==============================================================================
