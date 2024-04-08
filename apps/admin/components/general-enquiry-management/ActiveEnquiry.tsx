"use client";
import MobileSortDialog from "components/MobileSortDialog";
import { columns } from "components/enquries/columns";
import { DataTable } from "components/enquries/data-table";
import {
  OrderByDirection,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import Image from "next/image";
import { Sort } from "public/assets/icons";
import React, { useEffect, useState } from "react";
import { db } from "utils/firebase";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "components/Pagination";
import { usePagination } from "hooks/usePagination";
import { Drawer, DrawerContent, DrawerTrigger } from "ui";
import MobileDataList from "components/enquries/MobileDataList";
import { Input } from "ui";

export interface Enquiry {
  id: string;
  createdAt: Date;
  email: string;
  message: string;
  name: string;
  phoneNumber: string;
  role: string;
  status: string;
}

function ActiveEnquiry() {
  // const [prevEnquires, setPrevEnquires] = useState<Enquiry[]>()
  const [, setEnquires] = useState<Enquiry[]>();
  const [count, setCount] = useState<number>(0);
  const [selectedNameOption, setSelectedNameOption] =
    useState<string>("default");
  const [selectedDateOption, setSelectedDateOption] =
    useState<string>("default");

  const {
    updatePaginationMap,
    onNextPage,
    onPrevPage,
    endBeforeId,
    startAfterId,
    page,
    resultsPerPage,
    setResultsPerPage,
  } = usePagination();

  const fetchData = async () => {
    let sortingNameOrder: OrderByDirection =
      selectedNameOption === "az" ? "asc" : "desc";
    let sortingDateOrder: OrderByDirection =
      selectedDateOption === "on" ? "desc" : "asc";

    try {
      let q;

      q = query(
        collection(db, "enquiry"),
        where("status", "==", "active"),
        orderBy("name", sortingNameOrder),
        orderBy("createdAt", sortingDateOrder),
        limit(resultsPerPage)
      );

      if (page > 1) {
        if (startAfterId) {
          const cursor = await getDoc(doc(db, "enquiry", startAfterId));
          q = query(
            collection(db, "enquiry"),
            where("status", "==", "active"),
            orderBy("name", sortingNameOrder),
            orderBy("createdAt", sortingDateOrder),
            startAfter(cursor),
            limit(resultsPerPage)
          );
        }
      }

      const querySnapshot = await getDocs(q);
      const fetchedEnquiries: Enquiry[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        email: doc.data().email,
        message: doc.data().message,
        name: doc.data().name,
        phoneNumber: doc.data().phoneNumber,
        role: doc.data().role,
        status: doc.data().status,
      }));
      setEnquires(fetchedEnquiries);

      updatePaginationMap(page, {
        first: fetchedEnquiries?.[0].id,
        last: fetchedEnquiries?.[fetchedEnquiries.length - 1].id,
      });

      return fetchedEnquiries as Enquiry[];
    } catch (error) {
      console.error("Error fetching collection:", error);
      throw error;
    }
  };

  useEffect(() => {
    getCountFromServer(
      query(collection(db, "enquiry"), where("status", "==", "active"))
    ).then((snapshot) => {
      setCount(snapshot.data().count);
    });
  }, []);

  const [enquiry, setEnquiry] = useState<Enquiry | undefined>();
  const [id, setId] = useState<string>();

  const fetchEnquiry = async (id: string) => {
    try {
      const docRef = doc(db, "enquiry", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const enquiryData: Enquiry = {
          id: docSnap.id,
          createdAt: data.createdAt.toDate(),
          email: data.email,
          message: data.message,
          name: data.name,
          phoneNumber: data.phoneNumber,
          role: data.role,
          status: data.status,
        };

        setEnquiry(enquiryData);
      }
    } catch (error) {
      console.error("Error fetching enquiry:", error);
    }
  };

  const { data, status, refetch } = useQuery({
    queryKey: [
      "enquiry",
      page,
      startAfterId,
      endBeforeId,
      resultsPerPage,
      updatePaginationMap,
      selectedDateOption,
      selectedNameOption,
    ],
    queryFn: () => fetchData(),
  });

  const [isSortActive, setSortActive] = useState<boolean>(false);
  return (
    <div className="">
      <Drawer>
        <div className="hidden md:block w-full">
          <div className="flex flex-row justify-between w-full mt-8">
            <Input
              label="Enquiry ID"
              placeholder="Search by Enquiry ID..."
              onChange={(event: any) => setId(event.target.value)}
              className="w-[300%]"
            />
            <Image
              onClick={() => {
                {
                  id && fetchEnquiry(id);
                }
              }}
              src={Sort}
              alt=""
              height={40}
              width={40}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mt-6">
          {data && (
            <DataTable
              refetch={refetch}
              type="active"
              columns={columns}
              data={data}
            />
          )}
          <DrawerTrigger className="md:hidden w-full flex justify-end">
            <Image
              onClick={() => {
                setSortActive(true);
              }}
              src={Sort}
              alt=""
              height={40}
              width={40}
            />
          </DrawerTrigger>
        </div>
        <div className="md:hidden">
          {data && (
            <MobileDataList refetch={refetch} type="active" data={data} />
          )}
        </div>
        <DrawerContent className="md:h-[50%] h-[45%] md:flex md:items-center">
          <MobileSortDialog
            setSelectedDateOption={setSelectedDateOption}
            selectedDateOption={selectedDateOption}
            setSelectedNameOption={setSelectedNameOption}
            selectedNameOption={selectedNameOption}
            isActive={isSortActive}
            setIsActive={setSortActive}
          />
        </DrawerContent>
      </Drawer>
      {data && (
        <div className=" ">
          <Pagination
            count={count}
            page={page}
            onNextPage={() => onNextPage()}
            onPrevPage={() => onPrevPage()}
            resultsPerPage={resultsPerPage}
            setResultsPerPage={setResultsPerPage}
          />
        </div>
      )}
    </div>
  );
}

export default ActiveEnquiry;
