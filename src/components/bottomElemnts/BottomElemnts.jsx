import React, { useLayoutEffect, useState } from "react";
import { request } from "../utils/Request";

import {
  DndContext,
  useSensor,
  useSensors,
  closestCorners,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Element from "../elemnt/Element";
import { Button } from "react-bootstrap";

const elementsDummy = [
  {
    id: 1,
    name: "Bottom elemnt1",
  },
  {
    id: 2,
    name: "Bottom elemnt2",
  },
  {
    id: 3,
    name: "Bottom elemnt3",
  },
  {
    id: 4,
    name: "Bottom elemnt4",
  },
  {
    id: 5,
    name: "Bottom elemnt5",
  },
  {
    id: 6,
    name: "Bottom elemnt6",
  },
  {
    id: 7,
    name: "Bottom elemnt7",
  },
  {
    id: 8,
    name: "Bottom elemnt8",
  },
  {
    id: 9,
    name: "Bottom elemnt9",
  },
  {
    id: 10,
    name: "Bottom elemnt10",
  },
  {
    id: 11,
    name: "Bottom elemnt11",
  },
  {
    id: 12,
    name: "Bottom elemnt12",
  },
];

function BottomElemnts() {
  const [elements, setelements] = useState([]);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 10 } })
  );

  const getelementsPos = (id) =>
    elements.findIndex((section) => section.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setelements((elements) => {
      const originalPos = getelementsPos(active.id);
      const newPos = getelementsPos(over.id);

      return arrayMove(elements, originalPos, newPos);
    });
  };

  const handleMovingelements = async () => {
    // try {
    //   const { data } = await request({
    //     url: "/api/dashboard/elements/order",
    //     withCredentials: true,
    //     Authorization: `Bearer ${cookies?.user}`,
    //     method: "post",
    //     data: [...elements],
    //   });
    //   window.location.reload();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useLayoutEffect(() => {
    const getelementsOrder = async () => {
      // try {
      //   const { data } = await request({
      //     url: "/api/website/elements?lang=en",
      //   });
      //   setelements(data);
      // } catch (error) {
      //   console.error("Error fetching brands data:", error);
      // }
      setelements(elementsDummy);
    };

    getelementsOrder();
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={elements} strategy={verticalListSortingStrategy}>
        {elements.map((el) => (
          <div key={el.id}>
            <Element id={el.id} title={el.name} setelements={setelements} />
          </div>
        ))}
      </SortableContext>
      <li style={{ padding: "12px 16px", height: "auto" }}>
        <Button
          type="submit"
          onClick={handleMovingelements}
          className="submit-button"
          variant="info"
        >
          حفظ التغييرات
        </Button>
      </li>
    </DndContext>
  );
}

export default BottomElemnts;