import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, TrendingUp, Award } from 'lucide-react';

const RunningPerformance = () => {
  // Sample data - replace with your actual data source
  const [performanceData, setPerformanceData] = useState([
    { day: 'Monday', distance: 5.2, time: 26, pace: 5.0, calories: 420 },
    { day: 'Tuesday', distance: 3.1, time: 15, pace: 4.8, calories: 250 },
    { day: 'Wednesday', distance: 0, time: 0, pace: 0, calories: 0 },
    { day: 'Thursday', distance: 8.4, time: 45, pace: 5.4, calories: 680 },
    { day: 'Friday', distance: 4.5, time: 22, pace: 4.9, calories: 360 },
    { day: 'Saturday', distance: 12.5, time: 68, pace: 5.4, calories: 980 },
    { day: 'Sunday', distance: 0, time: 0, pace: 0, calories: 0 },
  ]);

  // Calculate weekly stats
  const totalDistance = performanceData.reduce((sum, day) => sum + day.distance, 0);
  const totalTime = performanceData.reduce((sum, day) => sum + day.time, 0);
  const activeDays = performanceData.filter(day => day.distance > 0).length;
  const avgPace = activeDays > 0 
    ? performanceData.reduce((sum, day) => sum + (day.distance > 0 ? day.pace : 0), 0) / activeDays 
    : 0;
  const bestPace = Math.min(...performanceData.filter(day => day.pace > 0).map(day => day.pace));
  const longestRun = Math.max(...performanceData.map(day => day.distance));

  return (
    <div className="p-6  dark:bg-gray-900 shadow-md max-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Weekly Running Performance</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <TrendingUp className="mr-2 text-blue-600 dark:text-blue-300" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Distance</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{totalDistance.toFixed(1)} km</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Goal: 30 km</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full" style={{ width: `${Math.min(100, (totalDistance/30)*100)}%` }}></div>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <Clock className="mr-2 text-green-600 dark:text-green-300" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Time</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{Math.floor(totalTime/60)}h {totalTime%60}m</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Goal: 3h 30m</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div className="bg-green-600 dark:bg-green-400 h-2 rounded-full" style={{ width: `${Math.min(100, (totalTime/210)*100)}%` }}></div>
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <Award className="mr-2 text-purple-600 dark:text-purple-300" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Achievements</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{activeDays}/7</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Days Active</p>
          <div className="flex mt-2">
            {performanceData.map((day, index) => (
              <div 
                key={index} 
                className={`h-4 w-4 rounded-full mr-1 ${day.distance > 0 ? 'bg-purple-600 dark:bg-purple-400' : 'bg-gray-200 dark:bg-gray-700'}`}
                title={day.day}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Performance Chart */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Weekly Progress</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis yAxisId="left" stroke="#9CA3AF" />
              <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', color: '#F9FAFB', borderColor: '#374151' }} />
              <Legend wrapperStyle={{ color: '#E5E7EB' }} />
              <Line yAxisId="left" type="monotone" dataKey="distance" stroke="#3b82f6" name="Distance (km)" />
              <Line yAxisId="right" type="monotone" dataKey="pace" stroke="#10b981" name="Pace (min/km)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Daily Breakdown */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Daily Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-2 text-left text-gray-800 dark:text-gray-100">Day</th>
                <th className="p-2 text-right text-gray-800 dark:text-gray-100">Distance (km)</th>
                <th className="p-2 text-right text-gray-800 dark:text-gray-100">Time (min)</th>
                <th className="p-2 text-right text-gray-800 dark:text-gray-100">Pace (min/km)</th>
                <th className="p-2 text-right text-gray-800 dark:text-gray-100">Calories</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((day, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                  <td className="p-2 font-medium text-gray-800 dark:text-gray-100">{day.day}</td>
                  <td className="p-2 text-right text-gray-800 dark:text-gray-200">{day.distance > 0 ? day.distance.toFixed(1) : '-'}</td>
                  <td className="p-2 text-right text-gray-800 dark:text-gray-200">{day.time > 0 ? day.time : '-'}</td>
                  <td className="p-2 text-right text-gray-800 dark:text-gray-200">{day.pace > 0 ? day.pace.toFixed(1) : '-'}</td>
                  <td className="p-2 text-right text-gray-800 dark:text-gray-200">{day.calories > 0 ? day.calories : '-'}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 dark:bg-gray-700 font-semibold">
                <td className="p-2 text-gray-800 dark:text-gray-100">Weekly Total</td>
                <td className="p-2 text-right text-gray-800 dark:text-gray-100">{totalDistance.toFixed(1)}</td>
                <td className="p-2 text-right text-gray-800 dark:text-gray-100">{totalTime}</td>
                <td className="p-2 text-right text-gray-800 dark:text-gray-100">{avgPace.toFixed(1)}</td>
                <td className="p-2 text-right text-gray-800 dark:text-gray-100">{performanceData.reduce((sum, day) => sum + day.calories, 0)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      
      {/* Personal Records */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-amber-50 dark:bg-amber-900 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-amber-700 dark:text-amber-200 mb-2">Best Pace</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{bestPace.toFixed(1)} min/km</p>
        </div>
        <div className="bg-sky-50 dark:bg-sky-900 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-sky-700 dark:text-sky-200 mb-2">Longest Run</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{longestRun.toFixed(1)} km</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-emerald-700 dark:text-emerald-200 mb-2">Weekly Goal</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{Math.round((totalDistance/30)*100)}% completed</p>
        </div>
      </div>
    </div>
  );
};

export default RunningPerformance;