import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { User, Bell, Lock, HelpCircle, LogOut, ChevronRight, Sun, Moon, Mic, FileText, Shield, Mail, MessageCircle } from 'react-native-feather';
import { useTheme } from '../contexts/ThemeContext';
import { globalTextStyles } from '../styles/globalStyles';

export const SettingsScreen = () => {
  const { theme, setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [voiceEnabled, setVoiceEnabled] = React.useState(true);

  const toggleTheme = () => {
    setTheme({
      ...theme,
      dark: !theme.dark,
      themeMode: theme.dark ? 'light' : 'dark',
    });
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={[globalTextStyles.h4, { color: theme.colors.text, marginTop: 24, marginBottom: 12 }]}>
      {title}
    </Text>
  );

  const SettingItem = ({ icon: Icon, title, subtitle, onPress, showChevron = true }: any) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingIcon}>
        <Icon width={24} height={24} stroke={theme.colors.text} />
      </View>
      <View style={styles.settingText}>
        <Text style={[globalTextStyles.bodyMedium, { color: theme.colors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[globalTextStyles.bodySmall, { color: theme.colors.text, opacity: 0.7, marginTop: 4 }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {showChevron && (
        <ChevronRight width={20} height={20} stroke={theme.colors.text} opacity={0.5} />
      )}
    </TouchableOpacity>
  );

  const ToggleItem = ({ icon: Icon, title, subtitle, value, onValueChange }: any) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Icon width={24} height={24} stroke={theme.colors.text} />
      </View>
      <View style={styles.settingText}>
        <Text style={[globalTextStyles.bodyMedium, { color: theme.colors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[globalTextStyles.bodySmall, { color: theme.colors.text, opacity: 0.7, marginTop: 4 }]}>
            {subtitle}
          </Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#767577', true: '#FF571E' }}
        thumbColor={value ? '#FFFFFF' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[globalTextStyles.h2, { color: theme.colors.text, marginBottom: 8 }]}>
          Settings
        </Text>
        <Text style={[globalTextStyles.body, { color: theme.colors.text, opacity: 0.8, marginBottom: 24 }]}>
          Manage your MyCompadres experience
        </Text>
        
        {/* Account Section */}
        <SectionHeader title="Account" />
        <SettingItem 
          icon={User}
          title="Profile"
          subtitle="Edit your personal information"
          onPress={() => console.log('Profile')}
        />
        <SettingItem 
          icon={LogOut}
          title="Sign Out"
          subtitle="Log out of your account"
          onPress={() => console.log('Sign Out')}
        />
        
        {/* Preferences Section */}
        <SectionHeader title="Preferences" />
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <View style={styles.settingIcon}>
            {theme.dark ? (
              <Moon width={24} height={24} stroke={theme.colors.text} />
            ) : (
              <Sun width={24} height={24} stroke={theme.colors.text} />
            )}
          </View>
          <View style={styles.settingText}>
            <Text style={[globalTextStyles.bodyMedium, { color: theme.colors.text }]}>
              Theme
            </Text>
            <Text style={[globalTextStyles.bodySmall, { color: theme.colors.text, opacity: 0.7, marginTop: 4 }]}>
              {theme.dark ? 'Dark mode' : 'Light mode'}
            </Text>
          </View>
          <ChevronRight width={20} height={20} stroke={theme.colors.text} opacity={0.5} />
        </TouchableOpacity>
        
        <ToggleItem 
          icon={Bell}
          title="Notifications"
          subtitle="Receive updates and reminders"
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        
        <ToggleItem 
          icon={Mic}
          title="Voice Interface"
          subtitle="Enable voice conversations"
          value={voiceEnabled}
          onValueChange={setVoiceEnabled}
        />
        
        {/* Privacy & Security */}
        <SectionHeader title="Privacy & Security" />
        <SettingItem 
          icon={Lock}
          title="Privacy Settings"
          subtitle="Control your data and visibility"
          onPress={() => console.log('Privacy')}
        />
        <SettingItem 
          icon={Shield}
          title="Security"
          subtitle="Password and authentication"
          onPress={() => console.log('Security')}
        />
        <SettingItem 
          icon={FileText}
          title="Data & Storage"
          subtitle="Manage conversation history"
          onPress={() => console.log('Data')}
        />
        
        {/* Support */}
        <SectionHeader title="Support" />
        <SettingItem 
          icon={HelpCircle}
          title="Help Center"
          subtitle="FAQs and guides"
          onPress={() => console.log('Help')}
        />
        <SettingItem 
          icon={MessageCircle}
          title="Contact Support"
          subtitle="Get in touch with our team"
          onPress={() => console.log('Contact')}
        />
        <SettingItem 
          icon={Mail}
          title="Send Feedback"
          subtitle="Help us improve MyCompadres"
          onPress={() => console.log('Feedback')}
        />
        
        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[globalTextStyles.bodySmall, { color: theme.colors.text, opacity: 0.6, textAlign: 'center' }]}>
            MyCompadres v0.1.0
          </Text>
          <Text style={[globalTextStyles.bodySmall, { color: theme.colors.text, opacity: 0.6, textAlign: 'center', marginTop: 4 }]}>
            © 2025 Compadres
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  appInfo: {
    marginTop: 32,
    marginBottom: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
});
