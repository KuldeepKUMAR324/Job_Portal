import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>
                    A list  of your Applied jobs
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="">  Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1, 2].map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    19-07-2025
                                </TableCell>
                                <TableCell>
                                  Frontend Developer
                                </TableCell>
                                <TableCell>
                                  Google
                                </TableCell>
                                <TableCell className="text-2xl">
                                   <Badge >Selected</Badge>
                                </TableCell>




                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </div>
    )
}

export default AppliedJobTable
