import { useEffect, useState } from 'react'
import { Check, Pencil, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { User } from '@/models/User'

const USERS_API_URL = import.meta.env.VITE_DB_URL_2 + '/Users'

function ManageUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [editingUserId, setEditingUserId] = useState<number | null>(null)
  const [draftUser, setDraftUser] = useState<User | null>(null)

  useEffect(() => {
    fetch(USERS_API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setUsers([]))
  }, [])

  const startEdit = (user: User) => {
    setEditingUserId(user.id)
    setDraftUser({ ...user })
  }

  const cancelEdit = () => {
    setEditingUserId(null)
    setDraftUser(null)
  }

  const saveEdit = async () => {
    if (!draftUser) {
      return
    }

    const response = await fetch(`${USERS_API_URL}/${draftUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(draftUser),
    })

    if (!response.ok) {
      alert('Failed to update user')
      return
    }

    setUsers((previousUsers) =>
      previousUsers.map((user) => (user.id === draftUser.id ? draftUser : user))
    )
    cancelEdit()
  }

  const updateDraftField = <K extends keyof User>(key: K, value: User[K]) => {
    setDraftUser((previousDraft) => {
      if (!previousDraft) {
        return previousDraft
      }
      return {
        ...previousDraft,
        [key]: value,
      }
    })
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-2xl font-semibold">Manage users</h1>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Actions</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const isEditing = editingUserId === user.id
              const rowUser = isEditing && draftUser ? draftUser : user

              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex gap-2">
                      {!isEditing ? (
                        <Button size="icon" variant="outline" onClick={() => startEdit(user)}>
                          <Pencil />
                        </Button>
                      ) : (
                        <>
                          <Button size="icon" variant="outline" onClick={saveEdit}>
                            <Check />
                          </Button>
                          <Button size="icon" variant="outline" onClick={cancelEdit}>
                            <X />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={rowUser.username}
                        onChange={(event) => updateDraftField('username', event.target.value)}
                      />
                    ) : (
                      user.username
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={rowUser.email}
                        onChange={(event) => updateDraftField('email', event.target.value)}
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={rowUser.firstName}
                        onChange={(event) => updateDraftField('firstName', event.target.value)}
                      />
                    ) : (
                      user.firstName
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={rowUser.lastName}
                        onChange={(event) => updateDraftField('lastName', event.target.value)}
                      />
                    ) : (
                      user.lastName
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Select
                        value={rowUser.role}
                        onValueChange={(value) => updateDraftField('role', value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Choose role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="visitor">Visitor</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="capitalize">{user.role}</span>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ManageUsers