"use client";
import React, { useState, useEffect } from "react";
import Card from "../../../components/Card";
import Footer from "../../../components/Footer";

import { useCouncilContext } from "../../../providers";
import { SpecificItemsStructure } from "../../../components/DataStructure";
import CommunityItemExpander from "../../../components/CommunityItemExpander";

type Props = {};
interface displayedItems extends SpecificItemsStructure {
  display: boolean; // whether the filtered list contains this item
}

const Repair = (props: Props) => {
  const homeCouncil = useCouncilContext();

  // Setting up the states for search list:
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    // corresponding set the siltered Items, must create a new object that represents the most-up-to-date filter
    const filtered = itemsData.map((item: displayedItems) => ({
      ...item,
      display: item.name.toLowerCase().includes(value.toLocaleLowerCase()),
    }));
    setItemsData(filtered);
  };

  // handle search input placeholder, when user clicks to serach, the full list of itemsData slide out:
  const [isClearingPlaceholder, setIsClearingPlaceholder] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const handleSearchClick = () => {
    setIsClearingPlaceholder(true);
    setSlideOut(true);
  };

  // Extracting items data
  const [itemsData, setItemsData] = useState<displayedItems[]>([]);
  const [isLoadingItems, setLoadingItems] = useState(true);
  useEffect(() => {
    if (homeCouncil.councilValue != null) {
      const paramValue = homeCouncil.councilValue.split(",")[0].trim();
      fetch(`/api/items/fetchItems?specificCouncil=${paramValue}`)
        .then((res) => res.json())
        .then((data) => {
          // Initialize the display property to be true for all items

          const filterdData = data.filter((ele: any) => {
            const isTrue = ele.methods.map((method: any) => {
              if (method.bin === null) {
                return true;
              }
            });

            const render = isTrue.map((e: any) => e == true);

            if (render[0] || render[1] || render[2]) {
              return ele;
            }
          });

          const displayedData: displayedItems[] = filterdData.map(
            (item: SpecificItemsStructure) => ({
              name: item.name,
              methods: item.methods,
              display: true,
            })
          );
          setItemsData(displayedData);
          // setItemsData(data);
          setLoadingItems(false);
        })
        .catch((error) => {
          console.log(
            "failed to fetch bins information based on the home council"
          );
        });
    }
  }, [homeCouncil.councilValue]);

  console.log(itemsData);
  return (
    <div>
      <Card>
        {/* <p> Here are our benefits to the selected council:</p> */}
        <h2 className="font-bold text-[5vw] sm:text-[3.2vw] md:text-[2.8vw] lg:text-[2.2vw] xl:text-[1.7vw]">Local community scheme - Repair</h2>
        <p className="text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.1vw]">
          In this section we’ll give you details on any tools’ libraries and
          repair corners/cafes or initiatives in your local area. Give your item
          a second (or third, fourth…) life!
        </p>
      </Card>

      <div className="mt-3 sm:w-[80%] sm:mx-auto lg:w-[70%] text-[4vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.3vw]">
        <input
          type="text"
          placeholder={`${isClearingPlaceholder ? "" : "Search Here ..."}`}
          value={searchValue}
          onClick={handleSearchClick}
          onChange={handleSearchChange}
          className="w-full px-2 py-1 mb-2 search-border-colour "
          disabled={isLoadingItems}
        />

        {isLoadingItems && <p className="text-center">Loading...</p>}
        {itemsData && (
          <div className="hide-scroll grid grid-cols-1 gap-[0.5rem] mb-4 rounded-lg max-h-[270px] sm:max-h-[300px] w-[100%] overflow-y-scroll">
            {itemsData.map((item: displayedItems, index: number) => {
              if (item.display) {
                return (
                  <CommunityItemExpander
                    key={JSON.stringify(item)}
                    name={item.name}
                    methods={item.methods}
                  />
                );
              }
            })}
          </div>
        )}
      </div>

      <Footer parentHeight={0} />
    </div>
  );
};

export default Repair;