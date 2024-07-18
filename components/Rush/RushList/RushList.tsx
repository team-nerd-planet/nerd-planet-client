"use client";

import React, { useEffect, useRef, useState } from 'react';
import styled from "@emotion/styled";
import RushSection from "../RushSection";
import RushItem from "./RushItem/RushItem";
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { toast } from "react-toastify";

const RushList = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [rushItems, setRushItems] = useState<RushItems[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const loadMoreRef = useIntersectionObserver(async () => {
    setIsFetching(true);
    await refetch();
    setIsFetching(false);
  });

  const increaseView = async (itemId: number) => {
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/item/increase_view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: itemId,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.item_view_count) {
          setRushItems(prev => prev.map(item => {
            if (item.item_id === itemId) {
              return {
                ...item,
                item_views: data.item_view_count,
              };
            }
            return item;
          }
          ));
        } else {
          toast.error(`❌ 에러 발생: ${data.message}`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error(`❌ 에러 발생: ${error}`);
      });

  }

  const refetch = async () => {
    const excludedIds = localStorage.getItem('excludedIds');
    const excludedIdsArray = excludedIds ? excludedIds.split(',') : [];
    const excludedIdsParam = excludedIds ? `?excluded_ids=${excludedIds}` : '?excluded_ids=';
    const limit = 10;
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/item/next' + excludedIdsParam + "&limit=" + limit);
    const data = await response.json();
    setRushItems([...rushItems, ...data]);
    excludedIdsArray.push(...data.map((item: RushItems) => item.item_id));
    localStorage.setItem('excludedIds', excludedIdsArray.join(','));
  }

  useEffect(() => {
    if (containerRef.current) {
      const observerOptions = {
        root: containerRef.current,
        rootMargin: '0px',
        threshold: 0.8, // 요소가 뷰포트에 50% 이상 보일 때 감지
      };

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // key를 가져와서 해당 아이템의 조회수를 증가시킵니다.
            const itemId = entry.target.getAttribute('data-item-id');
            if (itemId) {
              // increaseView(parseInt(itemId));
            }

          }
        });
      }, observerOptions);

      const rushItems = containerRef.current.querySelectorAll('.rush-item');

      if (observerRef.current) {
        rushItems.forEach(item => observerRef.current!.observe(item));
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [rushItems]);

  useEffect(() => {
    const getRushItems = async () => {
      // localStorage에 저장된 이미 본 아이템 ID 목록을 가져옵니다.
      const excludedIds = localStorage.getItem('excludedIds');
      const excludedIdsArray = excludedIds ? excludedIds.split(',') : [];
      const excludedIdsParam = excludedIds ? `?excluded_ids=${excludedIds}` : '?excluded_ids=';
      const limit = 10;
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/item/next' + excludedIdsParam + "&limit=" + limit);
      const data = await response.json();
      setRushItems(data);
      excludedIdsArray.push(...data.map((item: RushItems) => item.item_id));
      localStorage.setItem('excludedIds', excludedIdsArray.join(','));
    }


    getRushItems();
  }
    , []);

  return (
    <Container ref={containerRef}>
      {rushItems.map((item, index) => (
        <RushSection key={index} onRushAction={() => { }}>
          <RushItem
            key={item.item_id}
            className="rush-item" // 클래스 추가
            rush={item}
            setRushItems={setRushItems}
          />
        </RushSection>
      ))}
      <div ref={loadMoreRef} style={{ height: 1 }} />
      {isFetching && (
        <section style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontSize: 16,
          color: '#333',
          fontWeight: 'bold',
        }}>
          <div>{"데이터를 가져오고 있어요!🥳"}</div>
          <div>{"조금만 기다려주세요!"}</div>
        </section>
      )}
    </Container>
  );
};

export default RushList;

const Container = styled.div`
  padding-top: 24px;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;

  & > * {
    scroll-snap-align: start;
  }

  // Hide scrollbar for Chrome, Safari and Opera
  &::-webkit-scrollbar {
    display: none;
  }

  // Hide scrollbar for IE, Edge and Firefox
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
