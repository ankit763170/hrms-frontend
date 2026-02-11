import React, { useState, useEffect } from 'react';
import { Users, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { dashboardApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardApi.getStats();
      setStats(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;
  if (error) return <ErrorState message={error} onRetry={fetchStats} />;

  const statCards = [
    {
      title: 'Total Employees',
      value: stats?.total_employees || 0,
      icon: Users,
      bgColor: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Total Attendance Records',
      value: stats?.total_attendance_records || 0,
      icon: Calendar,
      bgColor: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Present Today',
      value: stats?.present_today || 0,
      icon: CheckCircle,
      bgColor: 'from-green-50 to-green-100',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
    },
    {
      title: 'Absent Today',
      value: stats?.absent_today || 0,
      icon: XCircle,
      bgColor: 'from-red-50 to-red-100',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your HR management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.bgColor} rounded-xl p-6 border ${stat.borderColor} transition-transform hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 card">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/employees" className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Users className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Manage Employees</p>
              <p className="text-sm text-gray-600">Add, view, or remove employees</p>
            </div>
          </a>
          <a href="/attendance" className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Calendar className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Mark Attendance</p>
              <p className="text-sm text-gray-600">Record daily attendance</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
