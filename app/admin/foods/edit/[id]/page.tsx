import EditFoodForm from "@/components/admin/foods/EditFoodForm"
import { Card, CardContent } from "@/components/ui/card"

const EditFood = () => {
  return (
    <div className="p-5 space-y-3">
        <h1 className="text-[18px] font-semibold">Update Food</h1>
        <Card>
            <CardContent>
                <EditFoodForm />
            </CardContent>
        </Card>
    </div>
  )
}

export default EditFood
