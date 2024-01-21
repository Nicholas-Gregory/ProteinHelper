import FoodListItem from "./FoodListItem";
import TabCard from "./TabCard";

export default function FoodList({ 
    foods, 
    onSelect,
    use,
    select 
}) {
    return (
        <>
            <div
                className="tab-title tab-selected"
            >
                Search Results
            </div>
            <div
                className="tab-content"
            >
                {foods.map(food =>
                    <div 
                        key={food._id}
                        style={{
                            marginTop: '5px',
                            marginBottom: '5px'
                        }}
                    >
                        <FoodListItem 
                            food={food} 
                            onSelect={id => onSelect(id)}
                            use={use}
                            select={select}
                        />
                    </div>    
                )}
            </div>
        </>
    )
}