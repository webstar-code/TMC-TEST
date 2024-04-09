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
import { Icons } from "components/Icons";

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
  const [, setEnquires] = useState<Enquiry[]>();
  const [count, setCount] = useState<number>(0);
  const [selectedNameOption, setSelectedNameOption] = useState<string | null>(
    null
  );
  const [selectedDateOption, setSelectedDateOption] = useState<string | null>(
    null
  );
  const [id, setId] = useState<string>();

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
      selectedNameOption === "asc" ? "asc" : "desc";
    let sortingDateOrder: OrderByDirection =
      selectedDateOption === "asc" ? "asc" : "desc";

    try {
      if (id) {
        const docRef = doc(db, "enquiry", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedEnquiries: Enquiry[] = docSnap.docs.map((doc: any) => ({
            id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            email: doc.data().email,
            message: doc.data().message,
            name: doc.data().name,
            phoneNumber: doc.data().phoneNumber,
            role: doc.data().role,
            status: doc.data().status,
          }));

          return fetchedEnquiries as Enquiry[];
        }
      } else {
        let q;

        q = query(
          collection(db, "enquiry"),
          where("status", "==", "active"),
          orderBy("createdAt", "desc"),
          limit(resultsPerPage)
        );

        if (selectedNameOption) {
          q = query(
            collection(db, "enquiry"),
            where("status", "==", "active"),
            orderBy("name", sortingNameOrder),
            limit(resultsPerPage)
          );
        } else if (selectedDateOption) {
          q = query(
            collection(db, "enquiry"),
            where("status", "==", "active"),
            orderBy("createdAt", sortingDateOrder),
            limit(resultsPerPage)
          );
        }

        if (page > 1) {
          if (startAfterId) {
            const cursor = await getDoc(doc(db, "enquiry", startAfterId));
            q = query(
              collection(db, "enquiry"),
              where("status", "==", "active"),
              orderBy("createdAt", "desc"),
              startAfter(cursor),
              limit(resultsPerPage)
            );
            if (selectedNameOption) {
              q = query(
                collection(db, "enquiry"),
                where("status", "==", "active"),
                orderBy("name", sortingNameOrder),
                startAfter(cursor),
                limit(resultsPerPage)
              );
            } else if (selectedDateOption) {
              const cursor = await getDoc(doc(db, "enquiry", startAfterId));
              q = query(
                collection(db, "enquiry"),
                where("status", "==", "active"),
                orderBy("createdAt", sortingDateOrder),
                startAfter(cursor),
                limit(resultsPerPage)
              );
            }
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
      }
    } catch (error) {
      console.error("Error fetching collection:", error);
      throw error;
    }
  };

  useEffect(() => {
    getCountFromServer(
      query(collection(db, "enquiry"), where("status", "==", "active"))
    ).then((snapshot: any) => {
      setCount(snapshot.data().count);
    });
  }, []);

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
      id,
    ],
    queryFn: () => fetchData(),
  });

  const [isSortActive, setSortActive] = useState<boolean>(false);
  return (
    <div className="relative">
      <Drawer>
        <div className="flex flex-row w-full">
          <div className="flex flex-row items-center gap-3 md:relative justify-start w-full mt-8 md:mt-14 md:mb-12">
            <div className="md:w-[40%] w-[80%] absolute z-20">
              <Input
                label="Enquiry ID"
                placeholder="Search by Enquiry ID..."
                onChange={(event: any) => setId(event.target.value)}
                className=""
              />
            </div>
            <div className="cursor-pointer absolute z-30 left-[240px] md:left-[450px]">
              <Icons.search width={20} height={20} />
            </div>
          </div>
          <DrawerTrigger className="md:hidden w-full flex justify-end mt-8">
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
        <div className="flex flex-row justify-between items-center mt-6">
          {data && (
            <DataTable
              setSelectedDateOption={setSelectedDateOption}
              selectedDateOption={selectedDateOption}
              setSelectedNameOption={setSelectedNameOption}
              selectedNameOption={selectedNameOption}
              isActive={isSortActive}
              setIsActive={setSortActive}
              refetch={refetch}
              type="active"
              columns={columns}
              data={data}
            />
          )}
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
