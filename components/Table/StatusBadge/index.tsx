import { Badge } from "@chakra-ui/react";
import { FC } from "react";

type StatusBadgeProps = {
    request: Global.Products.PurchaseRequestsTypes;
};

const StatusBadge: FC<StatusBadgeProps> = ({ request }) => {
    const Status = request.status;
    return (
        <Badge
            colorScheme={
                Status === "Approved"
                    ? "green"
                    : Status === "Rejected"
                    ? "red"
                    : "gray"
            }
            variant="outline"
            textTransform="none"
        >
            {Status}
        </Badge>
    );
};

export default StatusBadge;
