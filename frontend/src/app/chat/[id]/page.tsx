import ChatBase from "@/components/chat/ChatBase";
import { fetchChatGroups } from "@/fetch/groupFetch";
import { notFound } from "next/navigation";
import React from "react";

export default async function chat({ params }: { params: { id: string } }) {
  //   if (params.id.length != 36) {
  //     return notFound();
  //   }
  console.log(params);

  // const chatGroup: GroupChatType | null = await fetchChatGroups(params.id);

  //   if (chatGroup === null) {
  //     return notFound();
  //   }

  // const chatGroupUsers=await fetchChatGroupUsers

  return (
    <div>
      Hello i am chat == {JSON.stringify(params)}
      <ChatBase />
    </div>
  );
}
