import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  Search, 
  Filter, 
  ArrowLeft,
  Send,
  Paperclip,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Calendar,
  Phone,
  Mail,
  ChevronDown,
  Archive,
  Flag,
  Reply
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export function SupplierComplaints() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [replyText, setReplyText] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock complaints data
  const [complaints, setComplaints] = useState([
    {
      id: 'CMP001',
      vendor: {
        name: 'Rajesh Food Cart',
        owner: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        email: 'rajesh@foodcart.com'
      },
      subject: 'Product quality concern with tomatoes',
      category: 'quality',
      priority: 'high',
      status: 'open',
      isRead: false,
      createdAt: '2024-01-15T10:30:00Z',
      lastReply: '2024-01-15T10:30:00Z',
      orderId: 'ORD001',
      messages: [
        {
          id: 1,
          sender: 'vendor',
          senderName: 'Rajesh Kumar',
          content: 'I received the organic tomatoes today, but they seem to be overripe and not fresh as expected. This is affecting my customer satisfaction. Please check the quality control process.',
          timestamp: '2024-01-15T10:30:00Z',
          attachments: []
        }
      ]
    },
    {
      id: 'CMP002',
      vendor: {
        name: 'Priya Snacks Corner',
        owner: 'Priya Patel',
        phone: '+91 76543 21098',
        email: 'priya@snacks.com'
      },
      subject: 'Delivery delay for green peppers order',
      category: 'delivery',
      priority: 'medium',
      status: 'in-progress',
      isRead: true,
      createdAt: '2024-01-14T14:20:00Z',
      lastReply: '2024-01-14T16:45:00Z',
      orderId: 'ORD003',
      messages: [
        {
          id: 1,
          sender: 'vendor',
          senderName: 'Priya Patel',
          content: 'My order for green peppers was supposed to be delivered yesterday, but it hasn\'t arrived yet. Can you please provide an update on the delivery status?',
          timestamp: '2024-01-14T14:20:00Z',
          attachments: []
        },
        {
          id: 2,
          sender: 'supplier',
          senderName: 'Fresh Farms Ltd',
          content: 'We apologize for the delay. There was an unexpected traffic issue on the delivery route. Your order is now out for delivery and should reach you within 2 hours. We\'ll provide a discount on your next order as compensation.',
          timestamp: '2024-01-14T16:45:00Z',
          attachments: []
        }
      ]
    },
    {
      id: 'CMP003',
      vendor: {
        name: 'Mumbai Street Foods',
        owner: 'Suresh Gupta',
        phone: '+91 65432 10987',
        email: 'suresh@mumbaistreet.com'
      },
      subject: 'Billing discrepancy in last order',
      category: 'billing',
      priority: 'medium',
      status: 'resolved',
      isRead: true,
      createdAt: '2024-01-13T09:15:00Z',
      lastReply: '2024-01-13T15:30:00Z',
      orderId: 'ORD004',
      messages: [
        {
          id: 1,
          sender: 'vendor',
          senderName: 'Suresh Gupta',
          content: 'I was charged ₹1250 for ginger, but the agreed price was ₹45 per kg for 25kg, which should be ₹1125. Please clarify this billing discrepancy.',
          timestamp: '2024-01-13T09:15:00Z',
          attachments: []
        },
        {
          id: 2,
          sender: 'supplier',
          senderName: 'Fresh Farms Ltd',
          content: 'Thank you for bringing this to our attention. You are correct - there was an error in our billing system. The correct amount is ₹1125. We have processed a refund of ₹125 to your account.',
          timestamp: '2024-01-13T15:30:00Z',
          attachments: []
        },
        {
          id: 3,
          sender: 'vendor',
          senderName: 'Suresh Gupta',
          content: 'Thank you for the quick resolution. I have received the refund. Appreciate your prompt service!',
          timestamp: '2024-01-13T15:30:00Z',
          attachments: []
        }
      ]
    },
    {
      id: 'CMP004',
      vendor: {
        name: 'Street Food Hub',
        owner: 'Amit Sharma',
        phone: '+91 87654 32109',
        email: 'amit@streetfoodhub.com'
      },
      subject: 'Question about bulk ordering discounts',
      category: 'general',
      priority: 'low',
      status: 'open',
      isRead: false,
      createdAt: '2024-01-15T16:45:00Z',
      lastReply: '2024-01-15T16:45:00Z',
      orderId: null,
      messages: [
        {
          id: 1,
          sender: 'vendor',
          senderName: 'Amit Sharma',
          content: 'I\'m planning to place a large order for next month. Can you please share the bulk ordering discount structure? Also, do you offer any special rates for regular customers?',
          timestamp: '2024-01-15T16:45:00Z',
          attachments: []
        }
      ]
    }
  ]);

  const tabs = [
    { id: 'all', label: 'All', count: complaints.length },
    { id: 'unread', label: 'Unread', count: complaints.filter(c => !c.isRead).length },
    { id: 'open', label: 'Open', count: complaints.filter(c => c.status === 'open').length },
    { id: 'in-progress', label: 'In Progress', count: complaints.filter(c => c.status === 'in-progress').length },
    { id: 'resolved', label: 'Resolved', count: complaints.filter(c => c.status === 'resolved').length }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'quality', label: 'Product Quality' },
    { value: 'delivery', label: 'Delivery Issues' },
    { value: 'billing', label: 'Billing & Payment' },
    { value: 'general', label: 'General Inquiry' }
  ];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'unread' && !complaint.isRead) ||
                      (selectedTab !== 'all' && selectedTab !== 'unread' && complaint.status === selectedTab);
    const matchesSearch = complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || complaint.category === selectedFilter;
    
    return matchesTab && matchesSearch && matchesFilter;
  });

  const updateComplaintStatus = (complaintId, newStatus) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
    ));
  };

  const markAsRead = (complaintId) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId ? { ...complaint, isRead: true } : complaint
    ));
  };

  const sendReply = () => {
    if (!replyText.trim() || !selectedComplaint) return;

    const newMessage = {
      id: selectedComplaint.messages.length + 1,
      sender: 'supplier',
      senderName: 'Fresh Farms Ltd',
      content: replyText,
      timestamp: new Date().toISOString(),
      attachments: []
    };

    setComplaints(complaints.map(complaint => 
      complaint.id === selectedComplaint.id 
        ? { 
            ...complaint, 
            messages: [...complaint.messages, newMessage],
            lastReply: new Date().toISOString(),
            status: complaint.status === 'open' ? 'in-progress' : complaint.status
          }
        : complaint
    ));

    setReplyText('');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle },
      'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      resolved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle }
    };

    const config = statusConfig[status] || statusConfig.open;
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { bg: 'bg-red-100', text: 'text-red-800' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      low: { bg: 'bg-green-100', text: 'text-green-800' }
    };

    const config = priorityConfig[priority] || priorityConfig.medium;

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/supplier/dashboard')}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Complaints & Queries</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex h-[800px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Sidebar - Complaints List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Tabs */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-white'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                    {tab.count > 0 && (
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        selectedTab === tab.id
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-200 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Complaints List */}
            <div className="flex-1 overflow-y-auto">
              {filteredComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  onClick={() => {
                    setSelectedComplaint(complaint);
                    markAsRead(complaint.id);
                  }}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    selectedComplaint?.id === complaint.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${complaint.isRead ? 'bg-gray-300' : 'bg-blue-500'}`} />
                      <span className="font-medium text-gray-900 text-sm">{complaint.vendor.name}</span>
                      {getPriorityBadge(complaint.priority)}
                    </div>
                    <span className="text-xs text-gray-500">{formatTimestamp(complaint.lastReply)}</span>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                    {complaint.subject}
                  </h4>
                  
                  <div className="flex items-center justify-between">
                    {getStatusBadge(complaint.status)}
                    <span className="text-xs text-gray-500">
                      {complaint.orderId && `Order: ${complaint.orderId}`}
                    </span>
                  </div>
                </div>
              ))}

              {filteredComplaints.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No complaints found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Complaint Detail */}
          <div className="flex-1 flex flex-col">
            {selectedComplaint ? (
              <>
                {/* Complaint Header */}
                <div className="border-b border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {selectedComplaint.subject}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {selectedComplaint.vendor.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatTimestamp(selectedComplaint.createdAt)}
                        </div>
                        {selectedComplaint.orderId && (
                          <div>Order: {selectedComplaint.orderId}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getStatusBadge(selectedComplaint.status)}
                      <select
                        value={selectedComplaint.status}
                        onChange={(e) => updateComplaintStatus(selectedComplaint.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </div>

                  {/* Vendor Contact Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Vendor Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{selectedComplaint.vendor.owner}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{selectedComplaint.vendor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{selectedComplaint.vendor.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages Thread */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {selectedComplaint.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'supplier' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-3xl ${
                        message.sender === 'supplier'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      } rounded-lg p-4`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">
                            {message.senderName}
                          </span>
                          <span className={`text-xs ${
                            message.sender === 'supplier' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Box */}
                <div className="border-t border-gray-200 p-6">
                  <div className="space-y-4">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <Paperclip className="w-4 h-4 mr-2" />
                        Attach File
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Save Draft
                        </Button>
                        <Button
                          onClick={sendReply}
                          disabled={!replyText.trim()}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* No Complaint Selected */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a complaint</h3>
                  <p className="text-gray-600">Choose a complaint from the list to view details and respond.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
