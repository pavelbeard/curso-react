import {
    Badge,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Title,
} from "@tremor/react";
import { 
    PencilSquareIcon, 
    TrashIcon
 } from "@heroicons/react/24/outline";
 import { UserWithID } from "../types/types";
 import { useAppSelector } from "../hooks/store";
import { useUserActions } from "../hooks/useUserActions";
  

export default function ListOfUsers() {
    const users: UserWithID[] = useAppSelector(state => state.users);
    const { deleteUser } = useUserActions();

    return(
        <>
            <Title className="p-4">
                Usuarios
                <Badge className="ml-4 rounded-lg bg-sky-500 border-none">{users.length}</Badge>
            </Title>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Username ID</TableHeaderCell>
                        <TableHeaderCell>Username</TableHeaderCell>
                        <TableHeaderCell>Github</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => 
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell className="flex flex-row items-center">
                                <img 
                                    className="size-12 rounded-full"
                                    src={`https://unavatar.io/github/${user.github}`} 
                                    alt={user.github} 
                                    />
                                <span className="ml-4">{user.username}</span>
                            </TableCell>
                            <TableCell>{user.github}</TableCell>
                            <TableCell>
                                <div className="flex">
                                    <PencilSquareIcon className="size-4 hover:stroke-2" />
                                    <TrashIcon onClick={() => deleteUser(user.id)} className="size-4 ml-4 hover:stroke-2" />
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}