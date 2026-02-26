import Card from "@/components/ui/card"

function AdminHome() {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <Card header="Header">
        <p>Tere</p>
      </Card>

      <Card header={<h4 className="text-2xl">Header</h4>}>
        <p>Content here</p>
      </Card>
    </div>
  )
}

export default AdminHome