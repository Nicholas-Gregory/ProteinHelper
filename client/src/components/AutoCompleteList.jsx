import { useEffect, useRef, useState } from "react"

export default function AutoCompleteList({ items, maxHeight, onSelect, onClose }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const containerDivRef = useRef(null);

    function select(itemString) {
        onSelect(itemString);
    }

    function handleKeyDown(e) {
        const keyName = e.key;

        if (keyName === 'ArrowDown') {
            if (selectedItem === null) {
                setSelectedItem(0);

                containerDivRef.current.children[0].scrollIntoView();

                return;
            }

            if (selectedItem < items.length - 1) {
                setSelectedItem(selectedItem + 1);

                containerDivRef.current.children[selectedItem + 1].scrollIntoView();
            }
        }

        if (keyName === 'ArrowUp') {
            if (selectedItem === 0) {
                return;
            }

            setSelectedItem(selectedItem - 1);

            containerDivRef.current.children[selectedItem - 1].scrollIntoView();
        }

        if (keyName === 'Enter') {
            select(items[selectedItem]);
        }

        if (keyName === 'Escape') {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <>
            <div
                ref={containerDivRef}
                style={{
                    width: 'fit-content',
                    overflowY: 'auto',
                    maxHeight: maxHeight,
                    border: 'thin solid black'
                }}
            >
                {items.map((item, index) =>
                    <div
                        key={index}
                        style={{
                            padding: 3,
                            backgroundColor: selectedItem === index ?  'aqua' : 'aliceblue',
                            cursor: 'grab'
                        }}
                        onClick={() => select(items[index])}
                    >
                        {item}
                    </div>    
                )}
            </div>
        </>
    )
}