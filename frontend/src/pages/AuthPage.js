import React from "react";
import Login from "../components/Login.js";
import Signup from "../components/Signup";
import { Tab, Paper } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";

export default function AuthPage() {
    const [value, setValue] = React.useState(true);
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <Paper elevation={10} style={{ width: 500, margin: "60px auto" }}>
            <TabContext value={value}>
                <TabList
                    onChange={() => handleChange(!value)}
                    aria-label="auth tabs"
                    centered
                    variant="fullWidth"
                >
                    <Tab label="Sign In" value={true} />
                    <Tab label="Sign Up" value={false} />
                </TabList>
                <TabPanel value={true}>
                    <Login handleChange={handleChange} />
                </TabPanel>
                <TabPanel value={false}>
                    <Signup handleChange={handleChange} />
                </TabPanel>
            </TabContext>
        </Paper>
    );
}