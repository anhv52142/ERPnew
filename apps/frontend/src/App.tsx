import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import { CompaniesPage, UsersPage } from './pages/companies';
import { CrmLeadsPage, CrmCustomersPage, CrmContactsPage, CrmOpportunitiesPage, CrmActivitiesPage } from './pages/crm';
import { HrmDepartmentsPage, HrmPositionsPage, HrmEmployeesPage, HrmAttendancesPage, HrmLeavesPage, HrmContractsPage } from './pages/hrm';
import { InvCategoriesPage, InvProductsPage, InvWarehousesPage, InvStockMovementsPage } from './pages/inventory';
import { FinAccountsPage, FinBankAccountsPage, FinExpensesPage, FinTaxesPage } from './pages/finance';
import { SalesQuotationsPage, SalesOrdersPage, SalesInvoicesPage, SalesPaymentsPage } from './pages/sales';
import { MktCampaignsPage, MktLeadSourcesPage, MktEmailsPage } from './pages/marketing';
import { RptReportsPage, RptDashboardsPage } from './pages/reporting';
import { PlnProjectsPage, PlnMilestonesPage, PlnTasksPage, PlnResourcesPage } from './pages/planning';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<DashboardPage />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="crm/leads" element={<CrmLeadsPage />} />
            <Route path="crm/customers" element={<CrmCustomersPage />} />
            <Route path="crm/contacts" element={<CrmContactsPage />} />
            <Route path="crm/opportunities" element={<CrmOpportunitiesPage />} />
            <Route path="crm/activities" element={<CrmActivitiesPage />} />
            <Route path="hrm/departments" element={<HrmDepartmentsPage />} />
            <Route path="hrm/positions" element={<HrmPositionsPage />} />
            <Route path="hrm/employees" element={<HrmEmployeesPage />} />
            <Route path="hrm/attendances" element={<HrmAttendancesPage />} />
            <Route path="hrm/leaves" element={<HrmLeavesPage />} />
            <Route path="hrm/contracts" element={<HrmContractsPage />} />
            <Route path="inventory/categories" element={<InvCategoriesPage />} />
            <Route path="inventory/products" element={<InvProductsPage />} />
            <Route path="inventory/warehouses" element={<InvWarehousesPage />} />
            <Route path="inventory/stock-movements" element={<InvStockMovementsPage />} />
            <Route path="finance/accounts" element={<FinAccountsPage />} />
            <Route path="finance/bank-accounts" element={<FinBankAccountsPage />} />
            <Route path="finance/expenses" element={<FinExpensesPage />} />
            <Route path="finance/taxes" element={<FinTaxesPage />} />
            <Route path="sales/quotations" element={<SalesQuotationsPage />} />
            <Route path="sales/orders" element={<SalesOrdersPage />} />
            <Route path="sales/invoices" element={<SalesInvoicesPage />} />
            <Route path="sales/payments" element={<SalesPaymentsPage />} />
            <Route path="marketing/campaigns" element={<MktCampaignsPage />} />
            <Route path="marketing/lead-sources" element={<MktLeadSourcesPage />} />
            <Route path="marketing/emails" element={<MktEmailsPage />} />
            <Route path="reporting/reports" element={<RptReportsPage />} />
            <Route path="reporting/dashboards" element={<RptDashboardsPage />} />
            <Route path="planning/projects" element={<PlnProjectsPage />} />
            <Route path="planning/milestones" element={<PlnMilestonesPage />} />
            <Route path="planning/tasks" element={<PlnTasksPage />} />
            <Route path="planning/resources" element={<PlnResourcesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
