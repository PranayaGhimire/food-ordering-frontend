import EditFoodForm from "@/components/foods/EditFoodForm"
import { Card, CardContent } from "@/components/ui/card"

const EditFood = () => {
  return (
    <div className="px-5 md:px-20 py-10 space-y-3">
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
