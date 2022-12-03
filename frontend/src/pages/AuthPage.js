import React from "react";
import Login from "../components/Login.js";
import Signup from "../components/Signup";
import { Tab, Paper } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";

export default function AuthPage() {
    const [value, setValue] = React.useState("0");
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <Paper elevation={10} style={{ width: 500, margin: "60px auto" }}>
            <TabContext value={value}>
                <TabList
                    onChange={handleChange}
                    aria-label="auth tabs"
                    centered
                    variant="fullWidth"
                >
                    <Tab label="Sign In" value="0" />
                    <Tab label="Sign Up" value="1" />
                </TabList>
                <TabPanel value="0">
                    <Login handleChange={handleChange} />
                </TabPanel>
                <TabPanel value="1">
                    <Signup handleChange={handleChange} />
                </TabPanel>
            </TabContext>
        </Paper>
    );
}
