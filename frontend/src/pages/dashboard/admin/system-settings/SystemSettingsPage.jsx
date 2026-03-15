'use client';

import { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/header';
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState({
    appName: 'University ERP',
    maintenanceMode: false,
    emailNotifications: true,
    autoBackup: true,
    backupFrequency: 'daily',
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    twoFactorAuth: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
   
        <main className="p-8">
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-3xl font-bold">System Settings</h1>

            {settings.maintenanceMode && (
              <div className="flex items-center gap-3 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <span>Maintenance mode is currently enabled</span>
              </div>
            )}

            <div className="space-y-6 bg-card border border-border rounded-lg p-6">
              <div>
                <label className="block text-sm font-medium mb-2">Application Name</label>
                <input
                  type="text"
                  value={settings.appName}
                  onChange={(e) => handleChange('appName', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                />
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4">Maintenance Settings</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                    className="rounded border-input"
                  />
                  <span>Enable Maintenance Mode</span>
                </label>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                <label className="flex items-center gap-2 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                    className="rounded border-input"
                  />
                  <span>Enable Email Notifications</span>
                </label>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4">Backup Settings</h3>
                <label className="flex items-center gap-2 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(e) => handleChange('autoBackup', e.target.checked)}
                    className="rounded border-input"
                  />
                  <span>Enable Automatic Backups</span>
                </label>
                <div>
                  <label className="block text-sm font-medium mb-2">Backup Frequency</label>
                  <select
                    value={settings.backupFrequency}
                    onChange={(e) => handleChange('backupFrequency', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                  >
                    <option>hourly</option>
                    <option>daily</option>
                    <option>weekly</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleChange('maxLoginAttempts', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
                      className="rounded border-input"
                    />
                    <span>Enable Two-Factor Authentication</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                  <Save className="h-5 w-5" />
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        </main>
     
  );
}
