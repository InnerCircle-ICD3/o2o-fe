"use client";

const mock = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
  { id: 4, name: "Bob Brown" },
  { id: 5, name: "Charlie Davis" },
  { id: 6, name: "Diana Prince" },
  { id: 7, name: "Ethan Hunt" },
  { id: 8, name: "Fiona Apple" },
  { id: 9, name: "George Clooney" },
  { id: 10, name: "Hannah Montana" },
  { id: 11, name: "Ian Malcolm" },
  { id: 12, name: "Jack Sparrow" },
  { id: 13, name: "Katherine Johnson" },
  { id: 14, name: "Leonardo DiCaprio" },
  { id: 15, name: "Mia Wallace" },
  { id: 16, name: "Nina Simone" },
  { id: 17, name: "Oscar Isaac" },
  { id: 18, name: "Penny Lane" },
  { id: 19, name: "Quentin Tarantino" },
  { id: 20, name: "Rihanna Fenty" },
];

import VirtualScroll, { VirtualItem } from "@/components/common/virtualScroll";
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div
        style={{
          width: "300px",
          height: "100%",
        }}
      >
        <VirtualScroll
          overscan={2}
          heights={{
            item: { aspectRatio: 40 / 20 },
          }}
        >
          {mock.map(({ id, name }) => (
            <VirtualItem name="item" key={id}>
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: 40 / 20,
                }}
              >
                {name}
              </div>
            </VirtualItem>
          ))}
        </VirtualScroll>
      </div>
    </div>
  );
}
