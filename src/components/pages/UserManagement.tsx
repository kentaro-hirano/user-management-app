import { memo, useCallback, useEffect, VFC } from "react";
import { Center, Stack, Wrap, WrapItem } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

import { UserCard } from "../organisms/user/UserCard";
import { useDisclosure } from "@chakra-ui/hooks";

import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/user/UserDetailModal";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();

  useEffect(() => getUsers(), []);

  const onClickUser = useCallback(() => {
    onOpen();
  }, []);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal isOpen={isOpen} onClose={onClose} />
    </>
  );
});
