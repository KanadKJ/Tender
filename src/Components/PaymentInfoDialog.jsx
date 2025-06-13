import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const PaymentInfoDialog = ({ open, onClose, data }) => {
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <PaymentIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        Payment History
      </DialogTitle>
      <Divider />
      <DialogContent dividers sx={{ maxHeight: "70vh" }}>
        {data.length === 0 ? (
          <Typography variant="body1">No payment records found.</Typography>
        ) : (
          data.map((payment, index) => (
            <Paper
              key={index}
              elevation={2}
              sx={{ p: 2, mb: 3, borderLeft: "5px solid #1976d2" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                    Name
                  </Typography>
                  <Typography>{payment.firstName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                    Mobile
                  </Typography>
                  <Typography>{payment.mobileNo}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                    Email
                  </Typography>
                  <Typography>{payment.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    <MonetizationOnIcon fontSize="small" sx={{ mr: 1 }} />
                    Amount
                  </Typography>
                  <Typography>₹{payment.amount}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Plan
                  </Typography>
                  <Typography>{payment.planName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                    Captured At
                  </Typography>
                  <Typography>
                    {new Date(payment.capturedAt).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Payment Status
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        payment.paymentStatus === "success" ? "green" : "red",
                      fontWeight: 500,
                    }}
                  >
                    {payment.paymentStatus}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Payment ID
                  </Typography>
                  <Typography fontFamily="monospace">
                    {payment.paymentId}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Order ID
                  </Typography>
                  <Typography fontFamily="monospace">
                    {payment.orderId}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentInfoDialog;
