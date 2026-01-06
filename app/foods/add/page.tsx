import AddFoodForm from "@/components/foods/AddFoodForm";
import { Card, CardContent } from "@/components/ui/card";

const AddFood = () => {

  return (
    <div className="px-5 md:px-20 py-10 space-y-3">
      <h1 className="text-[18px] font-semibold">Add New Food</h1>
      <Card className="shadow-md border-t-4 border-t-cyan-500">
        <CardContent>
            <AddFoodForm/>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddFood;
