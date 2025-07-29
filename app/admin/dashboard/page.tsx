import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Users, 
  FileText, 
  Database, 
  Mail, 
  Shield, 
  Globe, 
  Code, 
  Server,
  Eye,
  AlertTriangle,
  Settings,
  Play,
  GitBranch,
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Activity,
  RefreshCw,
  Calendar,
  MapPin,
  MessageSquare
} from 'lucide-react';

const DynamicApulinkDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [timeRange, setTimeRange] = useState('7d');
  
  // Real-time metrics state
  const [metrics, setMetrics] = useState({
    users: {
      total: 247,
      buyers: 189,
      professionals: 58,
      growth: '+12%',
      trend: 'up'
    },
    surveys: {
      total: 156,
      pending: 23,
      completed: 133,
      avgValue: 850,
      growth: '+8%',
      trend: 'up'
    },
    revenue: {
      total: 45620,
      thisMonth: 12340,
      commission: 6843,
      growth: '+15%',
      trend: 'up'
    },
    emails: {
      sent: 1247,
      delivered: 1198,
      opened: 756,
      deliveryRate: 96.1,
      openRate: 60.6
    },
    system: {
      uptime: 99.8,
      responseTime: 240,
      activeUsers: 34,
      errors: 2
    }
  });

  // Regional data
  const [regionalData, setRegionalData] = useState([
    { region: 'Bari', surveys: 45, professionals: 18, revenue: 15420 },
    { region: 'Lecce', surveys: 38, professionals: 15, revenue: 12680 },
    { region: 'Brindisi', surveys: 29, professionals: 12, revenue: 9340 },
    { region: 'Taranto', surveys: 24, professionals: 8, revenue: 7180 },
    { region: 'Foggia', surveys: 12, professionals: 3, revenue: 2890 },
    { region: 'BAT', surveys: 8, professionals: 2, revenue: 1610 }
  ]);

  // Recent activity
  const [recentActivity, setRecentActivity] = useState([
    { type: 'survey', message: 'New survey request in Ostuni', time: '2 min ago', status: 'new' },
    { type: 'signup', message: 'Professional registered in Lecce', time: '15 min ago', status: 'success' },
    { type: 'payment', message: 'Survey payment received: €850', time: '32 min ago', status: 'success' },
    { type: 'email', message: 'Bulk email sent to 45 users', time: '1 hour ago', status: 'success' },
    { type: 'error', message: 'API rate limit exceeded', time: '2 hours ago', status: 'warning' }
  ]);

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Randomly update some metrics to simulate real-time
      setMetrics(prev => ({
        ...prev,
        system: {
          ...prev.system,
          activeUsers: Math.floor(Math.random() * 20) + 25,
          responseTime: Math.floor(Math.random() * 100) + 200
        }
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdate(new Date());
    setIsLoading(false);
  };

  const getMetricTrend = (growth, trend) => (
    <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
      {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
      <span>{growth}</span>
    </div>
  );

  const getActivityIcon = (type) => {
    switch (type) {
      case 'survey': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'signup': return <Users className="w-4 h-4 text-green-600" />;
      case 'payment': return <DollarSign className="w-4 h-4 text-green-600" />;
      case 'email': return <Mail className="w-4 h-4 text-purple-600" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm md:text-lg">A</span>
                </div>
                Apulink Dashboard
              </h1>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm"
              >
                <option value="24h">Last 24h</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button 
                onClick={refreshData}
                disabled={isLoading}
                className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                {!isMobile && 'Refresh'}
              </button>
              <button className="px-3 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm">
                <Play className="w-4 h-4" />
                {!isMobile && 'Deploy'}
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <div className="text-blue-600">
                <Users className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              {getMetricTrend(metrics.users.growth, metrics.users.trend)}
            </div>
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Total Users</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{metrics.users.total}</p>
              <p className="text-xs text-gray-500 mt-1">
                {metrics.users.buyers} buyers, {metrics.users.professionals} pros
              </p>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <div className="text-green-600">
                <FileText className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              {getMetricTrend(metrics.surveys.growth, metrics.surveys.trend)}
            </div>
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Survey Requests</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{metrics.surveys.total}</p>
              <p className="text-xs text-gray-500 mt-1">
                {metrics.surveys.pending} pending, avg €{metrics.surveys.avgValue}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <div className="text-purple-600">
                <DollarSign className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              {getMetricTrend(metrics.revenue.growth, metrics.revenue.trend)}
            </div>
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Revenue</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">€{metrics.revenue.total.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">
                €{metrics.revenue.thisMonth.toLocaleString()} this month
              </p>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <div className="text-orange-600">
                <Activity className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className={`w-2 h-2 rounded-full ${metrics.system.uptime > 99 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            </div>
            <div>
              <p className="text-gray-600 text-xs md:text-sm">System Health</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{metrics.system.uptime}%</p>
              <p className="text-xs text-gray-500 mt-1">
                {metrics.system.activeUsers} active users
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-6 md:mb-8">
          <div className="flex overflow-x-auto border-b">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'regional', label: 'Regional', icon: MapPin },
              { id: 'system', label: 'System', icon: Server },
              { id: 'activity', label: 'Activity', icon: Activity }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                  activeTab === tab.id 
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {!isMobile && tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  {/* Email Performance */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-6 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Email Performance
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-purple-700">Delivery Rate</p>
                        <p className="text-xl font-bold text-purple-900">{metrics.emails.deliveryRate}%</p>
                      </div>
                      <div>
                        <p className="text-purple-700">Open Rate</p>
                        <p className="text-xl font-bold text-purple-900">{metrics.emails.openRate}%</p>
                      </div>
                      <div>
                        <p className="text-purple-700">Sent Today</p>
                        <p className="text-lg font-semibold text-purple-900">{metrics.emails.sent}</p>
                      </div>
                      <div>
                        <p className="text-purple-700">Delivered</p>
                        <p className="text-lg font-semibold text-purple-900">{metrics.emails.delivered}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left p-3 bg-white rounded-lg text-sm hover:bg-blue-50 transition-colors">
                        🚨 Rotate OpenAI API Key (Critical)
                      </button>
                      <button className="w-full text-left p-3 bg-white rounded-lg text-sm hover:bg-blue-50 transition-colors">
                        📊 Export Analytics Report
                      </button>
                      <button className="w-full text-left p-3 bg-white rounded-lg text-sm hover:bg-blue-50 transition-colors">
                        ✉️ Send Weekly Newsletter
                      </button>
                      <button className="w-full text-left p-3 bg-white rounded-lg text-sm hover:bg-blue-50 transition-colors">
                        🔧 Run System Health Check
                      </button>
                    </div>
                  </div>
                </div>

                {/* Growth Trends */}
                <div className="bg-white border rounded-lg p-4 md:p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Growth Trends (Last 7 Days)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">+{metrics.users.growth}</div>
                      <div className="text-sm text-green-700">User Registrations</div>
                      <div className="text-xs text-gray-600 mt-1">18 new this week</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">+{metrics.surveys.growth}</div>
                      <div className="text-sm text-blue-700">Survey Requests</div>
                      <div className="text-xs text-gray-600 mt-1">23 new this week</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">+{metrics.revenue.growth}</div>
                      <div className="text-sm text-purple-700">Revenue Growth</div>
                      <div className="text-xs text-gray-600 mt-1">€2,340 this week</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Detailed Analytics</h3>
                
                {/* Conversion Funnel */}
                <div className="bg-white border rounded-lg p-4 md:p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Conversion Funnel</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                      <span className="text-sm font-medium">Website Visitors</span>
                      <span className="text-lg font-bold text-blue-600">1,247</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-100 rounded">
                      <span className="text-sm font-medium">Inquiry Forms Started</span>
                      <span className="text-lg font-bold text-blue-700">423 (33.9%)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-200 rounded">
                      <span className="text-sm font-medium">Forms Completed</span>
                      <span className="text-lg font-bold text-blue-800">247 (58.4%)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-300 rounded">
                      <span className="text-sm font-medium">Surveys Booked</span>
                      <span className="text-lg font-bold text-blue-900">156 (63.2%)</span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white border rounded-lg p-4 md:p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">User Engagement</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Avg. Session Duration</span>
                        <span className="font-medium">4m 32s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Pages per Session</span>
                        <span className="font-medium">3.2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Bounce Rate</span>
                        <span className="font-medium">34.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Return Visitors</span>
                        <span className="font-medium">28.5%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4 md:p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Professional Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Avg. Response Time</span>
                        <span className="font-medium">2.3 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Bid Success Rate</span>
                        <span className="font-medium">42.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Avg. Project Value</span>
                        <span className="font-medium">€{metrics.surveys.avgValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Completion Rate</span>
                        <span className="font-medium">94.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regional Tab */}
            {activeTab === 'regional' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Regional Performance</h3>
                
                <div className="grid gap-3 md:gap-4">
                  {regionalData.map((region, index) => (
                    <div key={region.region} className="bg-white border rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            index === 0 ? 'bg-green-500' : 
                            index === 1 ? 'bg-blue-500' : 
                            index === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}></div>
                          <h4 className="font-semibold text-gray-900">{region.region}</h4>
                        </div>
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Surveys</p>
                          <p className="text-lg font-bold text-gray-900">{region.surveys}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Professionals</p>
                          <p className="text-lg font-bold text-gray-900">{region.professionals}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Revenue</p>
                          <p className="text-lg font-bold text-gray-900">€{region.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Tab */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">System Health</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white border rounded-lg p-4 md:p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Performance</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Uptime</span>
                          <span className="font-medium">{metrics.system.uptime}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: `${metrics.system.uptime}%`}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Response Time</span>
                          <span className="font-medium">{metrics.system.responseTime}ms</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${metrics.system.responseTime < 300 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{width: '75%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4 md:p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">API Status</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Supabase', status: 'operational', responseTime: '120ms' },
                        { name: 'Resend Email', status: 'operational', responseTime: '89ms' },
                        { name: 'OpenAI API', status: 'degraded', responseTime: '450ms' },
                        { name: 'Sanity CMS', status: 'operational', responseTime: '156ms' }
                      ].map(service => (
                        <div key={service.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              service.status === 'operational' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                            <span className="text-sm font-medium">{service.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">{service.responseTime}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        activity.status === 'success' ? 'bg-green-100 text-green-800' :
                        activity.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicApulinkDashboard;
