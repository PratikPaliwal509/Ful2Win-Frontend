import React, { useState } from "react";
import { FiUser, FiMessageSquare, FiUsers, FiDollarSign, FiEdit, FiShare2, FiLogOut, FiMail } from "react-icons/fi";
import { FaTrophy, FaGamepad } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BackgroundBubbles from "../components/BackgroundBubbles";
// import ChatOverlay from "../components/ChatOverlay";

const ProfileScreen = () => {
  // Navigation state
  const [activeSection, setActiveSection] = useState('profile');
  const [activeProfileAction, setActiveProfileAction] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  // Mock data for friends with recent chats
  const [friendsWithChats] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastMessage: 'Hey, how are you doing?',
      time: '2h ago',
      unread: 3,
      online: true
    },
    {
      id: 2,
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      lastMessage: 'Let\'s catch up soon!',
      time: '1d ago',
      unread: 0,
      online: true
    },
    {
      id: 3,
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      lastMessage: 'Thanks for the help!',
      time: '2d ago',
      unread: 0,
      online: false
    },
    {
      id: 4,
      name: 'Emma Davis',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      lastMessage: 'See you tomorrow!',
      time: '3d ago',
      unread: 1,
      online: false
    }
  ]);

  const handleNavClick = (section) => {
    if (section === 'wallet') {
      // Navigate to the wallet page
      navigate('/wallet');
    } else {
      setActiveSection(section);
    }
  };

  const handleProfileAction = (action) => {
    setActiveProfileAction(action);
    // Show a simple alert for demo purposes
    // In a real app, you would navigate to the respective page or show a modal
    switch(action) {
      case 'email':
        alert('Email functionality will be implemented here');
        break;
      case 'edit':
        alert('Edit profile will open here');
        break;
      case 'referrals':
        alert('Referral section will open here');
        break;
      case 'kyc':
        alert('KYC status will be shown here');
        break;
      case 'logout':
        if (window.confirm('Are you sure you want to log out?')) {
          // Handle logout logic here
          alert('Logging out...');
        }
        break;
      default:
        break;
    }
    // Reset active action after a short delay for visual feedback
    setTimeout(() => setActiveProfileAction(null), 300);
  };

  return (
    <div className="min-h-screen w-full text-white overflow-x-hidden relative" style={{
      background: 'linear-gradient(to bottom, #0A2472 0%, #0D47A1 45%, #1565C0 100%)'
    }}>
      {/* Background blur when chat is open */}
      {selectedChat && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-20"></div>
      )}
      
      {/* Background Bubbles Component */}
      <BackgroundBubbles blur={!!selectedChat} />
      
      {/* Add animation keyframes and gradient border styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-20px) translateX(10px); }
          }
          .animate-float {
            animation: float 15s ease-in-out infinite;
          }
          .animation-delay-500 { animation-delay: 0.5s; }
          .animation-delay-1000 { animation-delay: 1s; }
          .animation-delay-1500 { animation-delay: 1.5s; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-2500 { animation-delay: 2.5s; }
          .animation-delay-3000 { animation-delay: 3s; }
          
          .gradient-border {
            position: relative;
            border-radius: 0.75rem;
            padding: 2px;
          }
          .gradient-border::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            border-radius: 0.875rem;
            padding: 2px;
            background: linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #0A2472 100%);
            -webkit-mask: 
              linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
          }
        `
      }} />

      {/* Chat Overlay */}
      {selectedChat && (
        <ChatOverlay
          friend={getSelectedFriend()}
          onClose={() => setSelectedChat(null)}
          onSendMessage={handleSendMessage}
        />
      )}

      {/* Main content */}
      <div className={`relative z-10 pt-16 pb-20 px-4 ${selectedChat ? 'opacity-50 pointer-events-none' : ''}`}>
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-4">
          {/* Profile header */}
          <div className="pt-16 pb-8 px-6 text-center">
            {/* Profile picture - responsive sizing */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-yellow-300 flex items-center justify-center overflow-hidden">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3069/3069172.png" 
                alt="Profile" 
                className="w-16 h-16 object-contain"
              />
            </div> 
            
            {/* Navigation icons */}
            <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6 sm:mb-8 px-4 max-w-2xl mx-auto w-full">
              {[
                { 
                  icon: <FiUser />, 
                  label: "Account",
                  id: 'profile'
                },
                { 
                  icon: <FiMessageSquare />, 
                  label: "Chat",
                  id: 'chat'
                },
                { 
                  icon: <FiUsers />, 
                  label: "Friends",
                  id: 'friends'
                },
                { 
                  icon: <FiDollarSign />, 
                  label: "Wallet",
                  id: 'wallet'
                }
              ].map((item) => (
                <div key={item.id} className="flex flex-col items-center flex-1 max-w-[80px] sm:max-w-none">
                  <button 
                    onClick={() => handleNavClick(item.id)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 p-2 sm:p-3 rounded-full transition-all duration-200 
                    focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-blue-600
                    transform hover:scale-105 active:scale-95
                    ${activeSection === item.id ? 'bg-blue-400' : 'bg-blue-500/90 hover:bg-blue-400'}`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {React.cloneElement(item.icon, { 
                        className: `w-5 h-5 sm:w-6 sm:h-6 ${activeSection === item.id ? 'scale-110' : ''} transition-transform` 
                      })}
                    </div>
                  </button>
                  <span className={`text-xs sm:text-sm mt-1.5 whitespace-nowrap transition-colors ${activeSection === item.id ? 'text-white font-medium' : 'text-white/80'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        {/* Stats cards */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 flex-1 max-w-2xl mx-auto w-full mt-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
            {/* Wins */}
            <div className="relative p-4 rounded-xl gradient-border bg-white">
              <div className="relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 border border-gray-200">
                    <FaTrophy className="text-yellow-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-800 text-lg">120</div>
                    <div className="text-xs text-gray-600">Wins</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Coins */}
            <div className="relative p-4 rounded-xl gradient-border bg-white">
              <div className="relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 border border-gray-200">
                    <FiDollarSign className="text-blue-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-800 text-lg">5,000</div>
                    <div className="text-xs text-gray-600">Coins</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Matches Played */}
            <div className="relative p-4 rounded-xl gradient-border bg-white">
              <div className="relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 border border-gray-200">
                    <FaGamepad className="text-purple-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-800 text-lg">1,234</div>
                    <div className="text-xs text-gray-600">Matches</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Friends */}
            <div className="relative p-4 rounded-xl gradient-border bg-white">
              <div className="relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 border border-gray-200">
                    <IoMdPerson className="text-green-500 text-xl" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-800 text-lg">89</div>
                    <div className="text-xs text-gray-600">Friends</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Sections */}
        <div className="px-4 max-w-2xl mx-auto w-full">
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <div className="gradient-border rounded-2xl p-1 mt-6 w-full">
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Information</h2>
                <div className="bg-white rounded-2xl overflow-hidden">
                  {[
                    { 
                      icon: <FiMail className="text-blue-600 group-hover:text-white transition-colors" />, 
                      text: "Email",
                      id: 'email',
                      action: 'email'
                    },
                    { 
                      icon: <FiEdit className="text-blue-600 group-hover:text-white transition-colors" />, 
                      text: "Edit Info",
                      id: 'edit',
                      action: 'edit'
                    },
                    { 
                      icon: <FiShare2 className="text-blue-600 group-hover:text-white transition-colors" />, 
                      text: "Referrals",
                      id: 'referrals',
                      action: 'referrals'
                    },
                    { 
                      icon: <span className="text-blue-600 font-bold group-hover:text-white transition-colors">KYC</span>, 
                      text: "KYC Status",
                      id: 'kyc',
                      action: 'kyc'
                    },
                    { 
                      icon: <FiLogOut className="text-red-500 group-hover:text-white transition-colors" />, 
                      text: "Log Out",
                      id: 'logout',
                      action: 'logout',
                      isDanger: true
                    }
                  ].map((item, index, array) => (
                    <React.Fragment key={item.id}>
                      <button 
                        onClick={() => handleProfileAction(item.action)}
                        disabled={activeProfileAction === item.action}
                        className={`w-full text-left flex items-center p-4 transition-all duration-200 focus:outline-none group
                          ${activeProfileAction === item.action 
                            ? 'bg-blue-100 scale-[0.98]' 
                            : 'hover:bg-blue-50 active:bg-blue-100'}
                          ${item.isDanger ? 'hover:bg-red-50 active:bg-red-100' : ''}
                        `}
                      >
                        <div className={`w-10 h-10 flex items-center justify-center mr-3 rounded-full transition-colors ${
                          activeProfileAction === item.action 
                            ? 'bg-blue-100' 
                            : item.isDanger 
                              ? 'bg-red-50 group-hover:bg-red-100' 
                              : 'bg-blue-50 group-hover:bg-blue-100'
                        }`}>
                          {item.icon}
                        </div>
                        <div className={`flex-1 text-left text-sm sm:text-base font-medium transition-colors ${
                          item.isDanger ? 'text-red-600' : 'text-gray-800'
                        }`}>
                          {item.text}
                        </div>
                        <div className={`transition-transform ${activeProfileAction === item.action ? 'scale-90' : ''}`}>
                          <div className={`w-5 h-5 flex items-center justify-center rounded-full ${
                            activeProfileAction === item.action 
                              ? 'bg-blue-600 text-white' 
                              : 'text-gray-400 group-hover:text-blue-600'
                          }`}>
                            &gt;
                          </div>
                        </div>
                      </button>
                      {index < array.length - 1 && (
                        <div className="flex justify-center px-4 py-1">
                          <div className="w-11/12 h-px bg-gray-400"></div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat Section */}
          {activeSection === 'chat' && (
            <div className="gradient-border rounded-2xl p-1 mt-6 w-full h-[600px]">
              <div className="bg-white rounded-2xl h-full flex flex-col">
                {!selectedChat ? (
                  // Chat list view
                  <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Chats</h2>
                    <div className="space-y-2">
                      {friendsWithChats.map((friend) => {
                        const lastMessage = messages[friend.id]?.[messages[friend.id]?.length - 1]?.text || friend.lastMessage;
                        return (
                          <div 
                            key={friend.id}
                            onClick={() => setSelectedChat(friend.id)}
                            className="flex items-center p-3 rounded-xl cursor-pointer transition-colors hover:bg-gray-50"
                          >
                            <div className="relative">
                              <img 
                                src={friend.avatar} 
                                alt={friend.name} 
                                className="w-12 h-12 rounded-full object-cover mr-3"
                              />
                              {friend.online && (
                                <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <h3 className="font-medium text-gray-900 truncate">{friend.name}</h3>
                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                  {messages[friend.id]?.[messages[friend.id]?.length - 1]?.timestamp 
                                    ? formatTime(messages[friend.id][messages[friend.id].length - 1].timestamp)
                                    : friend.time}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-600 truncate max-w-[180px] sm:max-w-xs">
                                  {lastMessage}
                                </p>
                                {friend.unread > 0 && (
                                  <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-2">
                                    {friend.unread}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // Chat detail view
                  <div className="flex flex-col h-full">
                    {/* Chat header */}
                    <div className="border-b border-gray-200 p-4 flex items-center bg-white sticky top-0 z-10">
                      <button 
                        onClick={() => setSelectedChat(null)}
                        className="mr-3 p-1 hover:bg-gray-100 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <img 
                        src={friendsWithChats.find(f => f.id === selectedChat)?.avatar} 
                        alt={friendsWithChats.find(f => f.id === selectedChat)?.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {friendsWithChats.find(f => f.id === selectedChat)?.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {friendsWithChats.find(f => f.id === selectedChat)?.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>

                    {/* Messages area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                      <div className="space-y-4">
                        {messages[selectedChat]?.length > 0 ? (
                          messages[selectedChat].map((msg) => (
                            <div 
                              key={msg.id} 
                              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-xs sm:max-w-md px-4 py-2 rounded-2xl ${
                                  msg.sender === 'me' 
                                    ? 'bg-blue-600 text-white rounded-br-none' 
                                    : 'bg-white border border-gray-200 rounded-bl-none'
                                }`}
                              >
                                <p className="text-sm">{msg.text}</p>
                                <p className={`text-xs mt-1 text-right ${msg.sender === 'me' ? 'text-blue-200' : 'text-gray-500'}`}>
                                  {formatTime(msg.timestamp)}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 text-sm py-8">
                            No messages yet. Start the conversation!
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="border-t border-gray-200 p-4 bg-white">
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, selectedChat)}
                          placeholder="Type a message..."
                          className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => sendMessage(selectedChat)}
                          className="ml-3 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Friends Section */}
          {activeSection === 'friends' && (
            <div className="gradient-border rounded-2xl p-1 mt-6 w-full">
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Friends</h2>
                <p className="text-gray-600">Your friends list will appear here</p>
              </div>
            </div>
          )}


          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20 md:static md:mt-8">
        <div className="max-w-2xl mx-auto">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;