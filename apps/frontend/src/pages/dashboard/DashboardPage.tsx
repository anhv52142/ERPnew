import { useEffect, useState } from 'react';
import api from '../../api/client';
import { 
  Users, 
  TrendingUp, 
  UserCheck, 
  Package, 
  Calendar, 
  ArrowUpRight, 
  Activity, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Plus,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

interface ActivityItem {
  id: string;
  title: string;
  type: string;
  priority: string;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [counts, setCounts] = useState({
    leads: 0,
    customers: 0,
    employees: 0,
    products: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [leadsRes, customersRes, employeesRes, productsRes, recentLeadsRes, recentActivitiesRes] = await Promise.all([
          api.get('/crm/leads?limit=1'),
          api.get('/crm/customers?limit=1'),
          api.get('/hrm/employees?limit=1'),
          api.get('/inventory/products?limit=1'),
          api.get('/crm/leads?limit=5'),
          api.get('/crm/activities?limit=5'),
        ]);

        setCounts({
          leads: leadsRes.data.meta?.total || 0,
          customers: customersRes.data.meta?.total || 0,
          employees: employeesRes.data.meta?.total || 0,
          products: productsRes.data.meta?.total || 0,
        });

        setRecentLeads(recentLeadsRes.data.items || []);
        setRecentActivities(recentActivitiesRes.data.items || []);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const stats = [
    { 
      label: 'Total Leads', 
      value: counts.leads, 
      change: '+14% vs last month',
      icon: Users,
      colorClass: 'from-indigo-500 to-purple-600',
      shadowClass: 'shadow-indigo-100',
      badgeColor: 'bg-indigo-500/20 text-indigo-200'
    },
    { 
      label: 'Active Customers', 
      value: counts.customers, 
      change: '+8% vs last month',
      icon: TrendingUp,
      colorClass: 'from-emerald-400 to-teal-600',
      shadowClass: 'shadow-emerald-100',
      badgeColor: 'bg-emerald-500/20 text-emerald-200'
    },
    { 
      label: 'Employees', 
      value: counts.employees, 
      change: '100% active',
      icon: UserCheck,
      colorClass: 'from-rose-400 to-pink-600',
      shadowClass: 'shadow-rose-100',
      badgeColor: 'bg-rose-500/20 text-rose-200'
    },
    { 
      label: 'Products', 
      value: counts.products, 
      change: 'In stock',
      icon: Package,
      colorClass: 'from-blue-500 to-cyan-600',
      shadowClass: 'shadow-cyan-100',
      badgeColor: 'bg-blue-500/20 text-blue-200'
    },
  ];

  // Format date helper
  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('vi-VN', options);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-950 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute left-1/3 bottom-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Hệ thống quản trị HMT ERP
            </span>
            <h1 className="text-3xl font-bold mt-2 tracking-tight">Chào mừng quay trở lại! 👋</h1>
            <p className="text-gray-300 mt-2 max-w-xl text-sm leading-relaxed">
              Hệ thống đã kết nối hoàn tất với backend và database. Dưới đây là phân tích thông số hoạt động của doanh nghiệp trong ngày hôm nay.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center gap-3 self-start md:self-auto">
            <div className="p-2.5 bg-indigo-600/30 rounded-lg text-indigo-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-indigo-200 font-medium">Hôm nay</p>
              <p className="text-sm font-semibold text-white mt-0.5">{getFormattedDate()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div 
              key={s.label} 
              className={`bg-gradient-to-br ${s.colorClass} rounded-2xl p-6 text-white shadow-lg ${s.shadowClass} transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl relative overflow-hidden group`}
            >
              <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full translate-x-4 translate-y-4 group-hover:scale-150 transition-all duration-500"></div>
              
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 text-sm font-medium tracking-wide">{s.label}</p>
                  <h3 className="text-3xl font-bold mt-2 tracking-tight">
                    {loading ? (
                      <span className="inline-block w-12 h-8 bg-white/20 animate-pulse rounded"></span>
                    ) : (
                      s.value
                    )}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl ${s.badgeColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/90">
                <span>{s.change}</span>
                <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Revenue Chart (Custom SVG) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Phân tích doanh thu</h3>
                <p className="text-xs text-gray-500">Biểu đồ doanh thu 6 tháng gần nhất (VND)</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-700 rounded-full flex items-center gap-1 border border-green-100">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-ping"></span>
                Trực quan hóa
              </span>
            </div>
            
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-2xl font-black text-gray-900">2.450.000.000đ</span>
              <span className="text-xs font-semibold text-green-600">+18.5% từ đầu quý</span>
            </div>

            {/* SVG Area Chart */}
            <div className="w-full h-48 relative mt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeDasharray="4 4" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeDasharray="4 4" />
                
                {/* Area under the line */}
                <path 
                  d="M 0 150 L 0 120 L 100 100 L 200 90 L 300 65 L 400 45 L 500 20 L 500 150 Z" 
                  fill="url(#chart-grad)" 
                />
                
                {/* Line Path */}
                <path 
                  d="M 0 120 L 100 100 L 200 90 L 300 65 L 400 45 L 500 20" 
                  fill="none" 
                  stroke="#4f46e5" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                />

                {/* Point Circles */}
                <circle cx="0" cy="120" r="4.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                <circle cx="100" cy="100" r="4.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                <circle cx="200" cy="90" r="4.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                <circle cx="300" cy="65" r="4.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                <circle cx="400" cy="45" r="4.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                <circle cx="500" cy="20" r="4.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
              </svg>
            </div>
            
            {/* Chart X-axis Labels */}
            <div className="flex justify-between text-xxs font-bold text-gray-400 mt-2 px-1">
              <span>Tháng 1</span>
              <span>Tháng 2</span>
              <span>Tháng 3</span>
              <span>Tháng 4</span>
              <span>Tháng 5</span>
              <span>Tháng 6</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Phím tắt nhanh</h3>
            <p className="text-xs text-gray-500 mb-6">Truy cập nhanh các chức năng chính để cập nhật dữ liệu</p>
            
            <div className="grid grid-cols-2 gap-4">
              <Link to="/crm" className="group flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all text-center">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-gray-700 mt-3 group-hover:text-indigo-900">CRM Leads</span>
              </Link>

              <Link to="/hrm" className="group flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all text-center">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-lg group-hover:scale-110 transition-transform">
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-gray-700 mt-3 group-hover:text-rose-900">Nhân sự (HRM)</span>
              </Link>

              <Link to="/inventory" className="group flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-cyan-50 border border-transparent hover:border-cyan-100 transition-all text-center">
                <div className="p-3 bg-cyan-100 text-cyan-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Package className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-gray-700 mt-3 group-hover:text-cyan-900">Kho hàng</span>
              </Link>

              <Link to="/companies" className="group flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all text-center">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-gray-700 mt-3 group-hover:text-emerald-900">Doanh nghiệp</span>
              </Link>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
            <span className="text-gray-500">Mẫu dữ liệu seed</span>
            <span className="font-semibold text-indigo-600">100 dòng / bảng</span>
          </div>
        </div>
      </div>

      {/* Lists Section: Recent Leads and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Khách hàng tiềm năng gần đây</h3>
              <p className="text-xs text-gray-500">5 leads mới cập nhật trong hệ thống</p>
            </div>
            <Link to="/crm" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5">
              Tất cả <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="py-3.5 flex items-center justify-between animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="w-24 h-4 bg-gray-100 rounded"></div>
                      <div className="w-32 h-3.5 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <div className="w-16 h-6 bg-gray-100 rounded-full"></div>
                </div>
              ))
            ) : recentLeads.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-sm">Chưa có dữ liệu leads. Hãy chạy lại SQL seed.</div>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="py-3.5 flex items-center justify-between hover:bg-slate-50/50 rounded-lg px-2 -mx-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${lead.firstName}`} 
                      alt="avatar" 
                      className="w-10 h-10 rounded-full border border-gray-100"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{lead.firstName} {lead.lastName}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {lead.email || 'no-email@company.com'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-xxs font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-gray-600 rounded-full">
                      {lead.source}
                    </span>
                    <span className={`text-xxs font-bold px-2 py-0.5 rounded-full ${
                      lead.status === 'new' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                      lead.status === 'qualified' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      'bg-purple-50 text-purple-600 border border-purple-100'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Hoạt động mới nhất</h3>
              <p className="text-xs text-gray-500">Các hoạt động theo dõi và chăm sóc khách hàng</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
              Mới
            </span>
          </div>

          <div className="divide-y divide-gray-50">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="py-3.5 flex items-center justify-between animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl"></div>
                    <div className="space-y-2">
                      <div className="w-36 h-4 bg-gray-100 rounded"></div>
                      <div className="w-24 h-3.5 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <div className="w-12 h-5 bg-gray-100 rounded-full"></div>
                </div>
              ))
            ) : recentActivities.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-sm">Chưa có dữ liệu hoạt động.</div>
            ) : (
              recentActivities.map((act) => (
                <div key={act.id} className="py-3.5 flex items-center justify-between hover:bg-slate-50/50 rounded-lg px-2 -mx-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      act.type === 'call' ? 'bg-blue-50 text-blue-600' :
                      act.type === 'email' ? 'bg-purple-50 text-purple-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      {act.type === 'call' ? <Phone className="w-4 h-4" /> : 
                       act.type === 'email' ? <Mail className="w-4 h-4" /> : 
                       <Activity className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{act.title}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        Trạng thái: <span className="font-semibold">{act.status}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-xxs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      act.priority === 'high' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                      act.priority === 'medium' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                      'bg-slate-50 text-gray-600 border border-gray-100'
                    }`}>
                      {act.priority}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
