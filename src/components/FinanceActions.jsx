import React, { useState } from 'react';
import { Calendar, Download } from 'lucide-react';

// Payment Modal Component
const PaymentModal = ({ isOpen, onClose, expenses, onSchedule }) => {
  const [payment, setPayment] = useState({
    category: '',
    amount: '',
    date: '',
    description: '',
    recipient: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule(payment);
    setPayment({
      category: '',
      amount: '',
      date: '',
      description: '',
      recipient: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Schedule New Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
              value={payment.category}
              onChange={(e) => setPayment({...payment, category: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select Category</option>
              {expenses.map((expense) => (
                <option key={expense.id} value={expense.category}>
                  {expense.category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount (₹)</label>
            <input
              type="number"
              value={payment.amount}
              onChange={(e) => setPayment({...payment, amount: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payment Date</label>
            <input
              type="date"
              value={payment.date}
              onChange={(e) => setPayment({...payment, date: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Recipient</label>
            <input
              type="text"
              value={payment.recipient}
              onChange={(e) => setPayment({...payment, recipient: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={payment.description}
              onChange={(e) => setPayment({...payment, description: e.target.value})}
              className="w-full p-2 border rounded-lg"
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Schedule Payment
          </button>
        </form>
      </div>
    </div>
  );
};

// Report Modal Component
const ReportModal = ({ isOpen, onClose, incomeData, expenseCategories }) => {
  const [reportConfig, setReportConfig] = useState({
    startDate: '',
    endDate: '',
    includeIncome: true,
    includeExpenses: true,
    format: 'pdf'
  });

  const generateReport = () => {
    const reportData = {
      dateRange: {
        start: reportConfig.startDate,
        end: reportConfig.endDate
      },
      income: reportConfig.includeIncome ? incomeData : [],
      expenses: reportConfig.includeExpenses ? expenseCategories : [],
      timestamp: new Date().toISOString()
    };

    const formattedData = JSON.stringify(reportData, null, 2);
    
    const blob = new Blob([formattedData], { 
      type: reportConfig.format === 'pdf' ? 'application/pdf' : 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial_report_${new Date().toISOString().split('T')[0]}.${reportConfig.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex bg-gray-900 items-center justify-center z-50">
      <div className="bg-gray rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Generate Financial Report</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={reportConfig.startDate}
                onChange={(e) => setReportConfig({...reportConfig, startDate: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={reportConfig.endDate}
                onChange={(e) => setReportConfig({...reportConfig, endDate: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Include in Report</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={reportConfig.includeIncome}
                  onChange={(e) => setReportConfig({...reportConfig, includeIncome: e.target.checked})}
                  className="mr-2"
                />
                Income Data
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={reportConfig.includeExpenses}
                  onChange={(e) => setReportConfig({...reportConfig, includeExpenses: e.target.checked})}
                  className="mr-2"
                />
                Expense Data
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Report Format</label>
            <select
              value={reportConfig.format}
              onChange={(e) => setReportConfig({...reportConfig, format: e.target.value})}
              className="w-full p-2 border rounded-lg"
            >
              <option value="pdf">PDF</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <button
            onClick={generateReport}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Generate and Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const FinanceActions = ({ expenses, incomeData, expenseCategories }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleSchedulePayment = (paymentDetails) => {
    console.log('Scheduling payment:', paymentDetails);
    // Handle payment scheduling logic here
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => setIsPaymentModalOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <Calendar className="h-5 w-5" />
        <span>Schedule Payment</span>
      </button>
      
      <button
        onClick={() => setIsReportModalOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        <Download className="h-5 w-5" />
        <span>Download Report</span>
      </button>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        expenses={expenses}
        onSchedule={handleSchedulePayment}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        incomeData={incomeData}
        expenseCategories={expenseCategories}
      />
    </div>
  );
};

export default FinanceActions;