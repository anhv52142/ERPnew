import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Building2, Briefcase, Package, Coins,
  ShoppingCart, Megaphone, BarChart3, Calendar, ChevronDown, ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/companies', icon: Building2, label: 'Companies' },
  { path: '/users', icon: Users, label: 'Users' },
  {
    label: 'CRM', icon: Briefcase, children: [
      { path: '/crm/leads', label: 'Leads' },
      { path: '/crm/customers', label: 'Customers' },
      { path: '/crm/contacts', label: 'Contacts' },
      { path: '/crm/opportunities', label: 'Opportunities' },
      { path: '/crm/activities', label: 'Activities' },
    ],
  },
  {
    label: 'HRM', icon: Users, children: [
      { path: '/hrm/departments', label: 'Departments' },
      { path: '/hrm/positions', label: 'Positions' },
      { path: '/hrm/employees', label: 'Employees' },
      { path: '/hrm/attendances', label: 'Attendance' },
      { path: '/hrm/leaves', label: 'Leaves' },
      { path: '/hrm/contracts', label: 'Contracts' },
    ],
  },
  {
    label: 'Inventory', icon: Package, children: [
      { path: '/inventory/categories', label: 'Categories' },
      { path: '/inventory/products', label: 'Products' },
      { path: '/inventory/warehouses', label: 'Warehouses' },
      { path: '/inventory/stock-movements', label: 'Stock Movements' },
    ],
  },
  {
    label: 'Finance', icon: Coins, children: [
      { path: '/finance/accounts', label: 'Chart of Accounts' },
      { path: '/finance/bank-accounts', label: 'Bank Accounts' },
      { path: '/finance/expenses', label: 'Expenses' },
      { path: '/finance/taxes', label: 'Taxes' },
    ],
  },
  {
    label: 'Sales', icon: ShoppingCart, children: [
      { path: '/sales/quotations', label: 'Quotations' },
      { path: '/sales/orders', label: 'Sales Orders' },
      { path: '/sales/invoices', label: 'Invoices' },
      { path: '/sales/payments', label: 'Payments' },
    ],
  },
  {
    label: 'Marketing', icon: Megaphone, children: [
      { path: '/marketing/campaigns', label: 'Campaigns' },
      { path: '/marketing/lead-sources', label: 'Lead Sources' },
      { path: '/marketing/emails', label: 'Emails' },
    ],
  },
  {
    label: 'Reporting', icon: BarChart3, children: [
      { path: '/reporting/reports', label: 'Reports' },
      { path: '/reporting/dashboards', label: 'Dashboards' },
    ],
  },
  {
    label: 'Planning', icon: Calendar, children: [
      { path: '/planning/projects', label: 'Projects' },
      { path: '/planning/milestones', label: 'Milestones' },
      { path: '/planning/tasks', label: 'Tasks' },
      { path: '/planning/resources', label: 'Resources' },
    ],
  },
];

function MenuGroup({ item }: { item: (typeof menuItems)[number] }) {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  if ('path' in item && item.path) {
    return (
      <NavLink
        to={item.path}
        end={item.path === '/'}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          )
        }
      >
        <item.icon className="h-5 w-5" />
        {item.label}
      </NavLink>
    );
  }

  const isChildActive = item.children?.some(c => location.pathname === c.path);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors',
          isChildActive ? 'text-white bg-gray-700' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        )}
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-5 w-5" />
          {item.label}
        </div>
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {open && (
        <div className="mt-1 ml-6 space-y-1">
          {item.children?.map(child => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive }) =>
                cn(
                  'block px-3 py-1.5 rounded text-sm transition-colors',
                  isActive ? 'bg-blue-600/30 text-blue-300' : 'text-gray-400 hover:text-white'
                )
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="px-4 py-5 border-b border-gray-700">
        <h1 className="text-xl font-bold tracking-tight">HMT ERP</h1>
        <p className="text-xs text-gray-400 mt-1">Enterprise Management</p>
      </div>
      <nav className="p-3 space-y-1.5">
        {menuItems.map((item, i) => (
          <MenuGroup key={i} item={item} />
        ))}
      </nav>
    </aside>
  );
}
