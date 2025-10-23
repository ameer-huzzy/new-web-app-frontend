import { useState } from "react";
import { dataStore, User as DataUser, generateId } from "../lib/dataStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

const activityLog = [
  {
    user: "Admin User",
    action: "Generated salary report for September 2024",
    timestamp: "2024-10-03 14:32",
  },
  {
    user: "HR Manager",
    action: "Added new employee: Ali Rahman (EMP005)",
    timestamp: "2024-10-03 11:15",
  },
  {
    user: "Admin User",
    action: "Uploaded weekly data for Week 40",
    timestamp: "2024-10-02 16:45",
  },
  {
    user: "Payroll Staff",
    action: "Applied deduction for traffic fine (EMP001)",
    timestamp: "2024-10-01 09:22",
  },
];

export function Settings() {
  const [users, setUsers] = useState(dataStore.users);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [settings, setSettings] = useState({
    companyName: "RiderApp Management",
    trainingFee: "500",
    cutoffDate: "3",
    emailNotifications: true,
    autoGenerateReports: true,
  });

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleAddUser = () => {
    if (!userForm.name || !userForm.email || !userForm.role) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newUser: DataUser = {
      id: generateId("U"),
      name: userForm.name,
      email: userForm.email,
      role: userForm.role,
      status: "active",
    };

    dataStore.users.push(newUser);
    setUsers([...dataStore.users]);
    setShowAddUserDialog(false);
    resetUserForm();
    toast.success("User added successfully!");
  };

  const handleDeleteUser = (userId: string) => {
    const index = dataStore.users.findIndex(u => u.id === userId);
    if (index !== -1) {
      dataStore.users.splice(index, 1);
      setUsers([...dataStore.users]);
      toast.success("User deleted successfully!");
    }
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
    // In a real app, this would persist the settings
  };

  const resetUserForm = () => {
    setUserForm({ name: "", email: "", role: "" });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl">Settings</h1>
        <p className="text-muted-foreground text-sm sm:text-base">System configuration and user management</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure global system parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName" 
                    value={settings.companyName}
                    onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trainingFee">Standard Training Fee (AED)</Label>
                  <Input 
                    id="trainingFee" 
                    type="number" 
                    value={settings.trainingFee}
                    onChange={(e) => setSettings({...settings, trainingFee: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cutoffDate">Monthly Salary Cut-off Date</Label>
                  <Input 
                    id="cutoffDate" 
                    type="number" 
                    min="1" 
                    max="31" 
                    value={settings.cutoffDate}
                    onChange={(e) => setSettings({...settings, cutoffDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" defaultValue="AED" disabled />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email alerts for weekly upload reminders
                  </p>
                </div>
                <Switch 
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Auto-generate Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically generate monthly salary reports on cut-off date
                  </p>
                </div>
                <Switch 
                  checked={settings.autoGenerateReports}
                  onCheckedChange={(checked) => setSettings({...settings, autoGenerateReports: checked})}
                />
              </div>

              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <Button onClick={() => setShowAddUserDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge>{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete user"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Define what each role can access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h4>Administrator</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Full access to all modules including system settings, user management, and data deletion
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4>Manager</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Can manage employees, partners, upload data, and generate reports. Cannot access system settings
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4>Staff</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Can view data and basic reports. Cannot modify employee records or upload data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Track all system activities and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activityLog.map((log, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm">
                      {log.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p>{log.user}</p>
                        <p className="text-sm text-muted-foreground">{log.timestamp}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{log.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account with specific permissions.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Full Name *</Label>
              <Input 
                id="userName" 
                placeholder="Enter user name" 
                value={userForm.name}
                onChange={(e) => setUserForm({...userForm, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail">Email *</Label>
              <Input 
                id="userEmail" 
                type="email" 
                placeholder="user@email.com" 
                value={userForm.email}
                onChange={(e) => setUserForm({...userForm, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userRole">Role *</Label>
              <Select value={userForm.role} onValueChange={(value) => setUserForm({...userForm, role: value})}>
                <SelectTrigger id="userRole">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAddUserDialog(false); resetUserForm(); }}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
