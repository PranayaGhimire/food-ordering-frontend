import EditFoodForm from "@/components/admin/foods/EditFoodForm"
import { Card, CardContent } from "@/components/ui/card"

const EditFood = () => {
  return (
    <div className="p-5 space-y-3">
        <h1 className="text-[18px] font-semibold">Update Food</h1>
        <Card className="dark:bg-stone-700 shadow-md border-t-4 border-t-cyan-500">
            <CardContent>
                <EditFoodForm />
            </CardContent>
        </Card>
    </div>
  )
}

export default EditFood
