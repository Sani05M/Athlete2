import React, { useState } from "react";
import { motion } from "framer-motion";
import FinanceActions from "./FinanceActions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  IndianRupee,
  Wallet,
  TrendingUp,
  AlertCircle,
  Calendar,
  Download,
  Edit2,
  Save,
  Plus,
  Trash2,
  Medal,
} from "lucide-react";

const EditableFinanceDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState([
    { id: 1, label: "Total Balance", value: 425000, icon: IndianRupee, color: "blue" },
    { id: 2, label: "Monthly Income", value: 185000, icon: Wallet, color: "green" },
    { id: 3, label: "Monthly Expenses", value: 95000, icon: TrendingUp, color: "orange" },
    { id: 4, label: "Pending Payments", value: 33000, icon: AlertCircle, color: "red" },
  ]);

  const [incomeData, setIncomeData] = useState([
    { month: "Jan", sponsorships: 150000, prizeMoney: 75000, endorsements: 200000 },
    { month: "Feb", sponsorships: 150000, prizeMoney: 90000, endorsements: 200000 },
    { month: "Mar", sponsorships: 175000, prizeMoney: 120000, endorsements: 225000 },
  ]);

  const [expenseCategories, setExpenseCategories] = useState([
    { id: 1, category: "Training", amount: 45000, pending: 5000 },
    { id: 2, category: "Equipment", amount: 30000, pending: 2000 },
    { id: 3, category: "Travel", amount: 65000, pending: 15000 },
    { id: 4, category: "Medical", amount: 25000, pending: 8000 },
    { id: 5, category: "Nutrition", amount: 20000, pending: 3000 },
  ]);

  const [goals, setGoals] = useState([
    { id: 1, goal: "Win National Championship", status: "In Progress" },
    { id: 2, goal: "Improve Sprint Time by 10%", status: "Not Started" },
    { id: 3, goal: "Increase Sponsorship Income", status: "Completed" },
  ]);

  const handleExpenseChange = (id, field, value) => {
    setExpenseCategories((categories) =>
      categories.map((category) =>
        category.id === id ? { ...category, [field]: value } : category
      )
    );
  };

  const addExpenseCategory = () => {
    const newId = Math.max(...expenseCategories.map((c) => c.id)) + 1;
    setExpenseCategories([
      ...expenseCategories,
      { id: newId, category: "New Category", amount: 0, pending: 0 },
    ]);
  };

  const deleteExpenseCategory = (id) => {
    setExpenseCategories((categories) => categories.filter((category) => category.id !== id));
  };

  const handleGoalChange = (id, field, value) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, [field]: value } : goal))
    );
  };

  const addGoal = () => {
    const newId = Math.max(...goals.map((g) => g.id)) + 1;
    setGoals([...goals, { id: newId, goal: "New Goal", status: "Not Started" }]);
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  return (
    <div className="w-full max-w-full max-h-full mx-auto p-6 space-y-6 bg-gray-900 text-gray-100  shadow-md">
      {/* Edit Mode Toggle */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isEditing ? <Save className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
          <span>{isEditing ? "Save Changes" : "Edit Dashboard"}</span>
        </motion.button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            className="p-4 bg-gray-800 rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center space-x-2">
              <stat.icon className={`h-8 w-8 text-${stat.color}-400`} />
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                {isEditing ? (
                  <input
                    type="number"
                    value={stat.value}
                    onChange={(e) =>
                      setStats((prev) =>
                        prev.map((item) =>
                          item.id === stat.id ? { ...item, value: Number(e.target.value) } : item
                        )
                      )
                    }
                    className="w-full p-1 border rounded bg-gray-700 text-gray-100"
                  />
                ) : (
                  <p className="text-2xl font-bold">₹{stat.value.toLocaleString()}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Income Chart */}
      <motion.div
        className="p-4 bg-gray-800 rounded-lg shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-bold mb-4">Income Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sponsorships" stroke="#8884d8" />
              <Line type="monotone" dataKey="prizeMoney" stroke="#82ca9d" />
              <Line type="monotone" dataKey="endorsements" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Expense Breakdown */}
      <div className="p-4 bg-gray-800 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Expense Breakdown</h2>
        <div className="space-y-4">
          {expenseCategories.map((expense) => (
            <motion.div
              key={expense.id}
              className="flex items-center justify-between p-2 border-b border-gray-700"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-grow">
                {isEditing ? (
                  <input
                    type="text"
                    value={expense.category}
                    onChange={(e) =>
                      handleExpenseChange(expense.id, "category", e.target.value)
                    }
                    className="p-1 border rounded bg-gray-700 text-gray-100"
                  />
                ) : (
                  <p className="font-medium">{expense.category}</p>
                )}
                <p className="text-sm text-gray-500">
                  Pending: ₹{expense.pending.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {isEditing ? (
                  <>
                    <input
                      type="number"
                      value={expense.amount}
                      onChange={(e) =>
                        handleExpenseChange(expense.id, "amount", Number(e.target.value))
                      }
                      className="p-1 border rounded w-32 bg-gray-700 text-gray-100"
                    />
                    <motion.button
                      onClick={() => deleteExpenseCategory(expense.id)}
                      whileHover={{ scale: 1.1 }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </motion.button>
                  </>
                ) : (
                  <p className="text-lg font-bold">₹{expense.amount.toLocaleString()}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        {isEditing && (
          <motion.button
            onClick={addExpenseCategory}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mt-4"
          >
            <Plus className="h-5 w-5" />
            <span>Add Category</span>
          </motion.button>
        )}
      </div>

      {/* Athlete Goals */}
      <FinanceActions 
  expenses={expenseCategories}
  incomeData={incomeData}
  expenseCategories={expenseCategories}
      />
      
      
    </div>
  );
};

export default EditableFinanceDashboard;
