import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui//card';
import { Badge } from '../ui//badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { mockClusterData, mockTransactions } from '../../lib/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui//table';

export function ClusteringInsights() {
  const [selectedCluster, setSelectedCluster] = useState(null);

  const clusterTransactions = selectedCluster
    ? mockTransactions.filter(t => t.category === selectedCluster && t.type === 'expense')
    : [];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Spending Insights</h1>
        <p className="text-slate-600 mt-1">AI-powered analysis of your spending patterns</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-600">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-600">{mockClusterData.length}</div>
            <p className="text-slate-500 mt-1">Identified spending patterns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-slate-600">Top Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-600">{mockClusterData[0].category}</div>
            <p className="text-slate-500 mt-1">रु {mockClusterData[0].totalSpent.toFixed(2)} spent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-slate-600">Average per Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-600">
              रु {(mockClusterData.reduce((sum, c) => sum + c.totalSpent, 0) / mockClusterData.length).toFixed(2)}
            </div>
            <p className="text-slate-500 mt-1">Across all categories</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Spending Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={mockClusterData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="totalSpent"
                  onClick={(data) => setSelectedCluster(data.category)}
                  style={{ cursor: 'pointer' }}
                >
                  {mockClusterData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      opacity={selectedCluster === null || selectedCluster === entry.category ? 1 : 0.3}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `$ रु{value.toFixed(2)}`}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center text-slate-500 mt-4">Click on a segment to view transactions</p>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Category Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={mockClusterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="category" 
                  stroke="#64748b"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  formatter={(value) => `$ रु{value.toFixed(2)}`}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="totalSpent" radius={[8, 8, 0, 0]}>
                  {mockClusterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead className="text-right">Transactions</TableHead>
                <TableHead className="text-right">Avg per Transaction</TableHead>
                <TableHead className="text-right">% of Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClusterData.map((cluster) => (
                <TableRow 
                  key={cluster.category}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => setSelectedCluster(cluster.category === selectedCluster ? null : cluster.category)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: cluster.color }}
                      />
                      {cluster.category}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">रु {cluster.totalSpent.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{cluster.transactionCount}</TableCell>
                  <TableCell className="text-right">
                    रु {(cluster.totalSpent / cluster.transactionCount).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">{cluster.percentage.toFixed(1)}%</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Selected Cluster Transactions */}
      {selectedCluster && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Transactions in {selectedCluster}</CardTitle>
              <Badge 
                variant="outline" 
                className="cursor-pointer"
                onClick={() => setSelectedCluster(null)}
              >
                Clear Selection
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clusterTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.merchant}</TableCell>
                    <TableCell className="text-right text-red-600">
                      रु {transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {transaction.notes || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {clusterTransactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-500">No transactions in this category</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900">AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <p className="text-purple-900">Optimize Your {mockClusterData[0].category} Spending</p>
            <p className="text-slate-700 mt-2">
              You're spending रु {mockClusterData[0].totalSpent.toFixed(2)} on {mockClusterData[0].category.toLowerCase()}. 
              Consider setting a monthly budget of रु {(mockClusterData[0].totalSpent * 0.85).toFixed(2)} to reduce costs by 15%.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <p className="text-purple-900">Track Your Progress</p>
            <p className="text-slate-700 mt-2">
              Monitor your spending patterns weekly to identify trends. Your most frequent category is {mockClusterData[0].category} 
              with {mockClusterData[0].transactionCount} transactions this month.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <p className="text-purple-900">Balance Your Budget</p>
            <p className="text-slate-700 mt-2">
              Consider redistributing some funds from {mockClusterData[0].category} to savings or investments to improve your financial health.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
