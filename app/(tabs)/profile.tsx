import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants/icons';

const Profile = () => {
  const profileData = {
    name: 'Dr. ABC DEF',
    email: 'abc.def@cgwb.gov.in',
    role: 'Senior Hydrogeologist',
    organization: 'Central Ground Water Board',
    location: 'New Delhi, India',
    joinDate: 'March 2019',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  };

  const menuItems = [
    {
      title: 'Account Settings',
      subtitle: 'Manage your account preferences',
      icon: icons.profile,
      color: '#FFA001',
    },
    {
      title: 'Notifications',
      subtitle: 'Configure alert preferences',
      icon: icons.analytics,
      color: '#3b82f6',
    },
    {
      title: 'Data Export',
      subtitle: 'Download reports and data',
      icon: icons.sort,
      color: '#22c55e',
    },
    {
      title: 'Research Papers',
      subtitle: 'Access published studies',
      icon: icons.filter,
      color: '#8b5cf6',
    },
    {
      title: 'Help & Support',
      subtitle: 'Get assistance and documentation',
      icon: icons.shieldCheck,
      color: '#f59e0b',
    },
    {
      title: 'About',
      subtitle: 'App version and information',
      icon: icons.health,
      color: '#6b7280',
    },
  ];

  const stats = [
    { label: 'Stations Monitored', value: '1,247' },
    { label: 'Reports Generated', value: '89' },
    { label: 'Data Points Analyzed', value: '50K+' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-dark-150">
      <View className="px-4 py-3 border-b border-dark-100">
        <Text className="text-primary text-2xl font-bold mb-2">Profile</Text>
        <Text className="text-secondary text-sm">Manage your account and preferences</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-4">
        <View className="mb-2">
          <View className="bg-dark-100 rounded-2xl p-6 border border-dark-150">
            <View className="flex-row items-center mb-4">
              <View className="w-20 h-20 rounded-full bg-dark-150 mr-4 items-center justify-center">
                {icons.profile('#FFA001', 32)}
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-primary mb-1">
                  {profileData.name}
                </Text>
                <Text className="text-secondary text-sm mb-1">
                  {profileData.role}
                </Text>
                <Text className="text-secondary text-xs">
                  {profileData.organization}
                </Text>
              </View>
            </View>
            
            <View className="border-t border-dark-150 pt-4">
              <View className="flex-row justify-between mb-2">
                <Text className="text-secondary text-sm">Email</Text>
                <Text className="text-primary text-sm">{profileData.email}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-secondary text-sm">Location</Text>
                <Text className="text-primary text-sm">{profileData.location}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-secondary text-sm">Member Since</Text>
                <Text className="text-primary text-sm">{profileData.joinDate}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mb-2">
          <Text className="text-lg font-semibold text-primary mb-1">Statistics</Text>
          <View className="flex-row justify-between gap-1">
            {stats.map((stat, index) => (
              <View key={index} className="flex-1">
                <View className="bg-dark-100 rounded-xl p-4 border border-dark-150 items-center h-24 justify-center">
                  <Text className="text-2xl font-bold text-primary mb-1">
                    {stat.value}
                  </Text>
                  <Text className="text-secondary text-xs text-center">
                    {stat.label}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-primary mb-1">Settings</Text>
          <View className="space-y-3">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-dark-100 rounded-xl p-4 mb-1 border border-dark-150"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-lg items-center justify-center mr-4"
                        style={{ backgroundColor: `${item.color}20` }}>
                    {item.icon(item.color, 20)}
                  </View>
                  <View className="flex-1">
                    <Text className="text-primary font-medium text-base mb-1">
                      {item.title}
                    </Text>
                    <Text className="text-secondary text-sm">
                      {item.subtitle}
                    </Text>
                  </View>
                  {icons.chevronRight('#6B7280', 20)}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-8">
          <TouchableOpacity
            className="bg-red-500/10 rounded-xl p-4 border border-red-500/20"
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-center">
              {icons.locate('#ef4444', 20)}
              <Text className="text-red-400 font-medium text-base ml-3">
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mb-20">
          <View className="items-center">
            <Text className="text-secondary text-sm mb-2">
              Groundwater Monitoring System
            </Text>
            <Text className="text-secondary text-xs">
              Version 1.0.0 • Build 2025.09.12
            </Text>
          </View>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;