import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import { Image } from 'mui-image';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


export default function UXPinBox() {

const [value, setValue] = React.useState(undefined);
const [value2, setValue2] = React.useState(undefined);
const [value4, setValue4] = React.useState(undefined);
const [value6, setValue6] = React.useState(undefined);

  return (<Box
  width="100%"
  sx={{ width: "100%", height: "100%", backgroundColor: "#F7F8FA", fontFamily: "Inter" }}
>
  <Box
    sx={{ backgroundColor: "#0B1F3A", color: "#fff", px: "48px", py: "18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
  >
    <Stack
      direction="row"
      spacing="14px"
      sx={{ alignItems: "center" }}
    >
      <Box
        sx={{ width: 36, height: 36, borderRadius: "8px", background: "linear-gradient(135deg, #FFB81C 0%, #E0A106 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Icon>
          <img
            style={{ width: 22, height: 22 }}
            alt="compass"
            src="https://api.iconify.design/mdi/compass-outline.svg?color=%230B1F3A"
          />
        </Icon>
      </Box>
      <Typography
        sx={{ fontWeight: 800, fontSize: "20px", letterSpacing: "-0.3px" }}
      >
        SiyaPhambili
      </Typography>
      <Typography
        sx={{ fontSize: "13px", color: "#9FB3D1", ml: "4px" }}
      >
        We Move Forward
      </Typography>
    </Stack>
    <Stack
      direction="row"
      spacing="28px"
      sx={{ alignItems: "center" }}
    >
      <Typography
        sx={{ fontSize: "14px", color: "#D7E1F0", cursor: "pointer" }}
      >
        Registry
      </Typography>
      <Typography
        sx={{ fontSize: "14px", color: "#D7E1F0", cursor: "pointer" }}
      >
        Pipeline
      </Typography>
      <Typography
        sx={{ fontSize: "14px", color: "#D7E1F0", cursor: "pointer" }}
      >
        Departments
      </Typography>
      <Typography
        sx={{ fontSize: "14px", color: "#D7E1F0", cursor: "pointer" }}
      >
        About #GKHack26
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#FFB81C", color: "#0B1F3A", fontWeight: 700, textTransform: "none", borderRadius: "8px", px: "18px", "&:hover": { backgroundColor: "#e6a617" } }}
      >
        Submit Solution
      </Button>
    </Stack>
  </Box>
  <Box
    sx={{ position: "relative", width: "100%", height: "340px" }}
  >
    <Image
      src="https://uc.uxpin.com/ai-chat/f12fc52d6e0d2268/images/1787691140453-0eb957ce04dab99d.png"
      fit="cover"
      width="100%"
      height="340px"
    />
    <Box
      sx={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(11,31,58,0.94) 0%, rgba(11,31,58,0.75) 45%, rgba(11,31,58,0.35) 100%)" }}
    />
    <Box
      sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", px: "48px" }}
    >
      <Chip
        label="GEEKULCHA ANNUAL HACKATHON 2026 · #GKHack26"
        sx={{ backgroundColor: "rgba(255,184,28,0.16)", color: "#FFB81C", fontWeight: 700, fontSize: "12px", width: "fit-content", mb: "18px", border: "1px solid rgba(255,184,28,0.4)" }}
      />
      <Typography
        sx={{ fontSize: "38px", fontWeight: 800, color: "#fff", maxWidth: "640px", lineHeight: 1.15, letterSpacing: "-0.5px" }}
      >
        A Civic Innovation Bridge for South Africa
      </Typography>
      <Typography
        sx={{ fontSize: "15px", color: "#D7E1F0", maxWidth: "560px", mt: "14px", lineHeight: 1.6 }}
      >
        The public registry connecting hackathon solutions to the government departments, universities, and sponsors who can take them from prototype to real deployment.
      </Typography>
      <Stack
        direction="row"
        spacing="32px"
        sx={{ mt: "26px" }}
      >
        <Box>
          <Typography
            sx={{ fontSize: "26px", fontWeight: 800, color: "#fff" }}
          >
            247
          </Typography>
          <Typography
            sx={{ fontSize: "12px", color: "#9FB3D1" }}
          >
            Registered Solutions
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "26px", fontWeight: 800, color: "#fff" }}
          >
            38
          </Typography>
          <Typography
            sx={{ fontSize: "12px", color: "#9FB3D1" }}
          >
            Piloted with Gov Depts
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "26px", fontWeight: 800, color: "#fff" }}
          >
            12
          </Typography>
          <Typography
            sx={{ fontSize: "12px", color: "#9FB3D1" }}
          >
            Fully Implemented
          </Typography>
        </Box>
      </Stack>
    </Box>
  </Box>
  <Box
    sx={{ px: "48px", py: "32px" }}
  >
    <Paper
      elevation={0}
      sx={{ p: "20px", borderRadius: "12px", border: "1px solid #E4E8EF", mb: "28px" }}
    >
      <Stack
        direction="row"
        spacing="16px"
        sx={{ alignItems: "center", flexWrap: "wrap" }}
      >
        <TextField
          placeholder="Search solutions, teams, or keywords..."
          size="small"
          sx={{ flex: 1, minWidth: "260px", backgroundColor: "#F7F8FA", borderRadius: "8px" }}
          InputProps={{ startAdornment: <InputAdornment
          position="start"
        >
          <Icon>
            <img
              style={{ width: 18, height: 18 }}
              alt="search"
              src="https://api.iconify.design/mdi/magnify.svg?color=%23667085"
            />
          </Icon>
        </InputAdornment> }}
          value={value}
          onChange={(...args) => { let value = args[0].target.value; setValue(value); }}
        />
        <FormControl
          size="small"
          sx={{ minWidth: "160px" }}
        >
          <Select
            defaultValue="all-sectors"
            displayEmpty={true}
            value={value2}
            onChange={(...args) => { let value2 = args[0].target.value; setValue2(value2); }}
          >
            <MenuItem
              value="all-sectors"
            >
              All Sectors
            </MenuItem>
            <MenuItem
              value="health"
            >
              Health
            </MenuItem>
            <MenuItem
              value="education"
            >
              Education
            </MenuItem>
            <MenuItem
              value="agriculture"
            >
              Agriculture
            </MenuItem>
            <MenuItem
              value="governance"
            >
              Governance
            </MenuItem>
            <MenuItem
              value="transport"
            >
              Transport
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl
          size="small"
          sx={{ minWidth: "160px" }}
        >
          <Select
            defaultValue="all-tech"
            displayEmpty={true}
            value={value4}
            onChange={(...args) => { let value4 = args[0].target.value; setValue4(value4); }}
          >
            <MenuItem
              value="all-tech"
            >
              All Technologies
            </MenuItem>
            <MenuItem
              value="ai-ml"
            >
              AI / ML
            </MenuItem>
            <MenuItem
              value="mobile"
            >
              Mobile App
            </MenuItem>
            <MenuItem
              value="web"
            >
              Web Platform
            </MenuItem>
            <MenuItem
              value="iot"
            >
              IoT / Hardware
            </MenuItem>
            <MenuItem
              value="blockchain"
            >
              Blockchain
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl
          size="small"
          sx={{ minWidth: "170px" }}
        >
          <Select
            defaultValue="all-stages"
            displayEmpty={true}
            value={value6}
            onChange={(...args) => { let value6 = args[0].target.value; setValue6(value6); }}
          >
            <MenuItem
              value="all-stages"
            >
              All Stages
            </MenuItem>
            <MenuItem
              value="idea"
            >
              Idea
            </MenuItem>
            <MenuItem
              value="prototype"
            >
              Prototype
            </MenuItem>
            <MenuItem
              value="pilot"
            >
              Pilot
            </MenuItem>
            <MenuItem
              value="scale"
            >
              Scale
            </MenuItem>
            <MenuItem
              value="implemented"
            >
              Implemented
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#D0D7E2", color: "#344054", fontWeight: 600 }}
        >
          <Icon>
            <img
              style={{ width: 16, height: 16, marginRight: 6 }}
              alt="filter"
              src="https://api.iconify.design/mdi/tune-variant.svg?color=%23344054"
            />
          </Icon>
          <span
          >
            More Filters
          </span>
        </Button>
      </Stack>
    </Paper>
    <Stack
      direction="row"
      spacing="12px"
      sx={{ mb: "22px", alignItems: "center" }}
    >
      <Typography
        sx={{ fontSize: "13px", fontWeight: 700, color: "#667085", textTransform: "uppercase", letterSpacing: "0.5px" }}
      >
        Pipeline:
      </Typography>
      <Chip
        label="Idea · 62"
        sx={{ backgroundColor: "#EEF1F6", color: "#475467", fontWeight: 600, fontSize: "12px" }}
      />
      <Chip
        label="Prototype · 98"
        sx={{ backgroundColor: "#FEF3E8", color: "#B5590A", fontWeight: 600, fontSize: "12px" }}
      />
      <Chip
        label="Pilot · 51"
        sx={{ backgroundColor: "#EAF2FE", color: "#1D5FC2", fontWeight: 600, fontSize: "12px" }}
      />
      <Chip
        label="Scale · 24"
        sx={{ backgroundColor: "#F1EAFB", color: "#6E36C7", fontWeight: 600, fontSize: "12px" }}
      />
      <Chip
        label="Implemented · 12"
        sx={{ backgroundColor: "#E7F7EE", color: "#1A8B4C", fontWeight: 600, fontSize: "12px" }}
      />
    </Stack>
    <Grid
      container={true}
      spacing={3}
    >
      <Grid
        item={true}
        xs={4}
      >
        <Card
          sx={{ borderRadius: "14px", border: "1px solid #E4E8EF", boxShadow: "0 2px 8px rgba(16,24,40,0.04)", height: "100%" }}
        >
          <Box
            sx={{ height: "4px", backgroundColor: "#B5590A" }}
          />
          <CardContent
            sx={{ p: "20px" }}
          >
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: "10px" }}
            >
              <Chip
                label="PROTOTYPE"
                size="small"
                sx={{ backgroundColor: "#FEF3E8", color: "#B5590A", fontWeight: 700, fontSize: "11px" }}
              />
              <Chip
                label="Health"
                size="small"
                sx={{ backgroundColor: "#F2F4F7", color: "#475467", fontSize: "11px" }}
              />
            </Stack>
            <Typography
              sx={{ fontWeight: 800, fontSize: "17px", color: "#101828", mb: "6px" }}
            >
              MoyaHealth Triage AI
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#667085", mb: "14px", lineHeight: 1.5 }}
            >
              An SMS-based AI triage assistant helping rural clinics prioritize patients when signal and staff are scarce.
            </Typography>
            <Stack
              direction="row"
              spacing="8px"
              sx={{ mb: "14px" }}
            >
              <Chip
                label="AI / ML"
                size="small"
                sx={{ backgroundColor: "#EEF1F6", color: "#475467", fontSize: "11px" }}
              />
              <Chip
                label="SMS"
                size="small"
                sx={{ backgroundColor: "#EEF1F6", color: "#475467", fontSize: "11px" }}
              />
            </Stack>
            <Divider
              sx={{ mb: "14px" }}
            />
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Stack
                direction="row"
                spacing="8px"
                sx={{ alignItems: "center" }}
              >
                <Avatar
                  sx={{ width: 24, height: 24, fontSize: "11px", backgroundColor: "#0B1F3A" }}
                >
                  TZ
                </Avatar>
                <Typography
                  sx={{ fontSize: "12px", color: "#667085" }}
                >
                  Team Zolani
                </Typography>
              </Stack>
              <Typography
                sx={{ fontSize: "12px", color: "#98A2B3" }}
              >
                GKHack26
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item={true}
        xs={4}
      >
        <Card
          sx={{ borderRadius: "14px", border: "1px solid #E4E8EF", boxShadow: "0 2px 8px rgba(16,24,40,0.04)", height: "100%" }}
        >
          <Box
            sx={{ height: "4px", backgroundColor: "#1D5FC2" }}
          />
          <CardContent
            sx={{ p: "20px" }}
          >
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: "10px" }}
            >
              <Chip
                label="PILOT"
                size="small"
                sx={{ backgroundColor: "#EAF2FE", color: "#1D5FC2", fontWeight: 700, fontSize: "11px" }}
              />
              <Chip
                label="Education"
                size="small"
                sx={{ backgroundColor: "#F2F4F7", color: "#475467", fontSize: "11px" }}
              />
            </Stack>
            <Typography
              sx={{ fontWeight: 800, fontSize: "17px", color: "#101828", mb: "6px" }}
            >
              FundiConnect
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#667085", mb: "14px", lineHeight: 1.5 }}
            >
              Offline-first tutoring matching platform now piloting with the Gauteng Department of Education in 6 schools.
            </Typography>
            <Stack
              direction="row"
              spacing="8px"
              sx={{ mb: "14px" }}
            >
              <Chip
                label="Mobile App"
                size="small"
                sx={{ backgroundColor: "#EEF1F6", color: "#475467", fontSize: "11px" }}
              />
              <Chip
                label="Offline-first"
                size="small"
                sx={{ backgroundColor: "#EEF1F6", color: "#475467", fontSize: "11px" }}
              />
            </Stack>
            <Divider
              sx={{ mb: "14px" }}
            />
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Stack
                direction="row"
                spacing="8px"
                sx={{ alignItems: "center" }}
              >
                <Avatar
                  sx={{ width: 24, height: 24, fontSize: "11px", backgroundColor: "#1D5FC2" }}
                >
                  NK
                </Avatar>
                <Typography
                  sx={{ fontSize: "12px", color: "#667085" }}
                >
                  Ndlovu & Khumalo
                </Typography>
              </Stack>
              <Typography
                sx={{ fontSize: "12px", color: "#98A2B3" }}
              >
                GKHack25
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item={true}
        xs={4}
      >
        <Card
          sx={{ borderRadius: "14px", border: "1px solid #E4E8EF", boxShadow: "0 2px 8px rgba(16,24,40,0.04)", height: "100%" }}
        >
          <Box
            sx={{ height: "4px", backgroundColor: "#1A8B4C" }}
          />
          <CardContent
            sx={{ p: "20px" }}
          >
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: "10px" }}
            >
              <Chip
                label="IMPLEMENTED"
                size="small"
                sx={{ backgroundColor: "#E7F7EE", color: "#1A8B4C", fontWeight: 700, fontSize: "11px" }}
              />
              <Chip
                label="Agriculture"
                size="small"
                sx={{ backgroundColor: "#F2F4F7", color: "#475467", fontSize: "11px" }}
              />
            </Stack>
            <Typography
              sx={{ fontWeight: 800, fontSize: "17px", color: "#101828", mb: "6px" }}
            >
              AmaFama Yield Tracker
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#667085", mb: "14px", lineHeight: 1.5 }}
            >
              Smallholder crop yield and weather advisory tool, now deployed by the Dept of Agriculture in Limpopo.
            </Typography>
            <Stack
              direction="row"
              spacing="8px"
              sx={{ mb: "14px" }}
            >
              <Chip
                label="IoT"
                size="small"
                sx={{ backgroundColor: "#EEF1F6", color: "#475467", fontSize: "11px" }}
              />
              <Chip
                label="Web Platform"
                size="small"
                sx={{ backgroundColor: "#EEF1F6", color: "#475467", fontSize: "11px" }}
              />
            </Stack>
            <Divider
              sx={{ mb: "14px" }}
            />
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Stack
                direction="row"
                spacing="8px"
                sx={{ alignItems: "center" }}
              >
                <Avatar
                  sx={{ width: 24, height: 24, fontSize: "11px", backgroundColor: "#1A8B4C" }}
                >
                  MP
                </Avatar>
                <Typography
                  sx={{ fontSize: "12px", color: "#667085" }}
                >
                  Mpho & Partners
                </Typography>
              </Stack>
              <Typography
                sx={{ fontSize: "12px", color: "#98A2B3" }}
              >
                GKHack24
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item={true}
        xs={4}
      >
        <Card
          sx={{ borderRadius: "14px", border: "1px solid #E4E8EF", boxShadow: "0 2px 8px rgba(16,24,40,0.04)", height: "100%" }}
        >
          <Box
            sx={{ height: "4px", backgroundColor: "#667085" }}
          />
          <CardContent
            sx={{ p: "20px" }}
          >
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: "10px" }}
            >
              <Chip
                label="IDEA"
                size="small"
                sx={{ backgroundColor: "#EEF1F6", color: "#475467", fontWeight: 700, fontSize: "11px" }}
              />
              <Chip
                label="Governance"
                size="small"
                sx={{ backgroundColor: "#F2F4F7", color: "#475467", fontSize: "11px" }}
              />
            </Stack>
            <Typography
              sx={{ fontWeight: 800, fontSize: "17px", color: "#101828", mb: "6px" }}
            >
              Sikhona CivicVoice
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#667085", mb: "14px", lineHeight: 1.5 }}
            >
              WhatsApp-based ward feedback and service delivery complaint tracker for municipal councils.
            </Typography>
            <Stack
              direction="row"
              spacing="8px"
              sx={{ mb: "14px" }}
            >
              <Chip
                label="Chatbot"
                size="small"
                sx={{ backgroundColor: "#EEF1F6", color: "#475467", fontSize: "11px" }}
              />
              <Chip
                label="WhatsApp API"
                size="small"
                sx={{ backgroundColor: "#EEF1F6", color: "#475467", fontSize: "11px" }}
              />
            </Stack>
            <Divider
              sx={{ mb: "14px" }}
            />
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Stack
                direction="row"
                spacing="8px"
                sx={{ alignItems: "center" }}
              >
                <Avatar
                  sx={{ width: 24, height: 24, fontSize: "11px", backgroundColor: "#475467" }}
                >
                  LB
                </Avatar>
                <Typography
                  sx={{ fontSize: "12px", color: "#667085" }}
                >
                  Lebo Baloyi
                </Typography>
              </Stack>
              <Typography
                sx={{ fontSize: "12px", color: "#98A2B3" }}
              >
                GKHack26
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item={true}
        xs={4}
      >
        <Card
          sx={{ borderRadius: "14px", border: "1px solid #E4E8EF", boxShadow: "0 2px 8px rgba(16,24,40,0.04)", height: "100%" }}
        >
          <Box
            sx={{ height: "4px", backgroundColor: "#6E36C7" }}
          />
          <CardContent
            sx={{ p: "20px" }}
          >
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: "10px" }}
            >
              <Chip
                label="SCALE"
                size="small"
                sx={{ backgroundColor: "#F1EAFB", color: "#6E36C7", fontWeight: 700, fontSize: "11px" }}
              />
              <Chip
                label="Transport"
                size="small"
                sx={{ backgroundColor: "#F2F4F7", color: "#475467", fontSize: "11px" }}
              />
            </Stack>
            <Typography
              sx={{ fontWeight: 800, fontSize: "17px", color: "#101828", mb: "6px" }}
            >
              TaxiTrack Live
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#667085", mb: "14px", lineHeight: 1.5 }}
            >
              Crowd-sourced minibus taxi route and ETA tracking, expanding from Joburg pilot to 4 provinces.
            </Typography>
            <Stack
              direction="row"
              spacing="8px"
              sx={{ mb: "14px" }}
            >
              <Chip
                label="GIS"
                size="small"
                sx={{ backgroundColor: "#EEF1F6", color: "#475467", fontSize: "11px" }}
              />
              <Chip
                label="Mobile App"
                size="small"
                sx={{ backgroundColor: "#EEF1F6", color: "#475467", fontSize: "11px" }}
              />
            </Stack>
            <Divider
              sx={{ mb: "14px" }}
            />
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Stack
                direction="row"
                spacing="8px"
                sx={{ alignItems: "center" }}
              >
                <Avatar
                  sx={{ width: 24, height: 24, fontSize: "11px", backgroundColor: "#6E36C7" }}
                >
                  SM
                </Avatar>
                <Typography
                  sx={{ fontSize: "12px", color: "#667085" }}
                >
                  Sipho Mahlangu
                </Typography>
              </Stack>
              <Typography
                sx={{ fontSize: "12px", color: "#98A2B3" }}
              >
                GKHack23
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item={true}
        xs={4}
      >
        <Card
          sx={{ borderRadius: "14px", border: "2px dashed #D0D7E2", boxShadow: "none", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAFBFC" }}
        >
          <Stack
            sx={{ alignItems: "center", textAlign: "center", p: "20px" }}
          >
            <Icon>
              <img
                style={{ width: 32, height: 32 }}
                alt="add"
                src="https://api.iconify.design/mdi/plus-circle-outline.svg?color=%23667085"
              />
            </Icon>
            <Typography
              sx={{ fontSize: "14px", fontWeight: 700, color: "#475467", mt: "10px" }}
            >
              Register Your Solution
            </Typography>
            <Typography
              sx={{ fontSize: "12px", color: "#98A2B3", mt: "4px" }}
            >
              Add your #GKHack26 build to the registry
            </Typography>
          </Stack>
        </Card>
      </Grid>
    </Grid>
    <Stack
      direction="row"
      sx={{ justifyContent: "center", mt: "32px" }}
    >
      <Pagination
        count={12}
        shape="rounded"
        color="primary"
      />
    </Stack>
  </Box>
  <Box
    sx={{ backgroundColor: "#0B1F3A", color: "#fff", px: "48px", py: "28px", mt: "20px" }}
  >
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Typography
        sx={{ fontSize: "13px", color: "#9FB3D1" }}
      >
        SiyaPhambili · Built for Geekulcha Annual Hackathon 2026 · #GKHack26
      </Typography>
      <Stack
        direction="row"
        spacing="20px"
      >
        <Typography
          sx={{ fontSize: "13px", color: "#D7E1F0" }}
        >
          GitHub
        </Typography>
        <Typography
          sx={{ fontSize: "13px", color: "#D7E1F0" }}
        >
          API Docs
        </Typography>
        <Typography
          sx={{ fontSize: "13px", color: "#D7E1F0" }}
        >
          Contact
        </Typography>
      </Stack>
    </Stack>
  </Box>
</Box>);
}