SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict TBN81dIx8PPZ5J5s6w0jgQCpokGWXgUv1GxM4tM3pbDYV9dpI94a8808EEBGICN

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at", "invite_token", "referrer", "oauth_client_state_id", "linking_target_id", "email_optional") VALUES
	('9067856a-b8c5-405b-a04d-18f283f963f9', '83bf074c-2271-4555-928e-e5f4458bf65e', 'cc0fc10b-474c-4aee-a0ac-4aec2dbc01c9', 's256', 'e8wgsXbbsmz-gVxDA-N8BnkWGG7h3sJO3dufmTwFFM0', 'email', '', '', '2026-03-13 11:09:21.28698+00', '2026-03-13 11:09:21.28698+00', 'email/signup', NULL, NULL, NULL, NULL, NULL, false),
	('ee3781d4-9995-4661-a2b7-7efe59429abd', '83bf074c-2271-4555-928e-e5f4458bf65e', '02c0593f-528c-4667-959a-24be04068006', 's256', 'VlTa2Nga5LAOpjOMd_eapEFNUkNWWQ1K-cEWYqP4ZXI', 'email', '', '', '2026-03-13 11:33:38.846263+00', '2026-03-13 11:33:38.846263+00', 'email/signup', NULL, NULL, NULL, NULL, NULL, false),
	('c039a245-8753-4e97-a256-cda25b1b1092', '83bf074c-2271-4555-928e-e5f4458bf65e', 'c4dc4c18-63a1-4b3a-86c3-b92e3a92a792', 's256', 'bGHZrEMyBYPsK-eHx2OBODBDAiUSVCFN65Tjn-08VNk', 'magiclink', '', '', '2026-03-13 11:35:36.88469+00', '2026-03-13 11:35:36.88469+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('9e0a13c0-39a6-4a27-8a3b-8f0956826a5e', '83bf074c-2271-4555-928e-e5f4458bf65e', 'e288b5a9-94eb-4d29-b3a4-c15300c3dd5e', 's256', '_rnwKXeKoUFjgtKiv0wcC2g5PDgLSexXVOZeo4C6oLU', 'magiclink', '', '', '2026-03-13 13:52:14.975865+00', '2026-03-13 13:52:14.975865+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('27ba025e-4a3c-46a5-ad51-3f34565d744d', '6b6f429b-b372-466b-a961-518d767a84fe', 'b9ee39b2-7287-43a0-adf5-d3ade6d3c5d2', 's256', '3kx3iFfq3jWWSexj7njWtyxgQ5wTCYN7f4u0tVb_vAQ', 'magiclink', '', '', '2026-03-13 16:41:23.262515+00', '2026-03-13 16:41:23.262515+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('d1e36491-8b17-48d8-b33e-eff235984367', '05693bfe-1b0f-44aa-b011-b5a49ba27910', '9b748986-05f1-4ed6-a6b0-fc69f56e2eef', 's256', 'HXcU0UFQsxt2VoGItsvx7aHrlvTFd5gyxIRngDVEM9U', 'magiclink', '', '', '2026-03-13 16:42:27.609742+00', '2026-03-13 16:42:27.609742+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('56645ff6-d0c9-4790-930b-18e683817917', '83bf074c-2271-4555-928e-e5f4458bf65e', '1b8d4da2-8e2e-4d20-b1d2-ec3562860569', 's256', 'kePQSn0KPnJUubqOZg36uQbq6Hb1-PQ15RA8Hruttu8', 'magiclink', '', '', '2026-03-13 16:44:21.163119+00', '2026-03-13 16:44:21.163119+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('4b963597-8c27-4ed4-b354-370b5bc37c68', '83bf074c-2271-4555-928e-e5f4458bf65e', '248f2cd4-6479-4829-824b-ca4ca7cbfa61', 's256', '7AUNCMJi8Unyjn71cnSk9zIFLfFou6OuznSKqMyyGmE', 'magiclink', '', '', '2026-03-15 01:16:38.5899+00', '2026-03-15 01:16:38.5899+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('4a113be9-eff8-4d88-b1a9-a3ba50dba363', '83bf074c-2271-4555-928e-e5f4458bf65e', '045f8d01-d044-4d40-8d0c-05566cb28890', 's256', '2eE_lkMQPsFeRMoy5yf1SoyMX56zi4BiKrftYuL45Kw', 'magiclink', '', '', '2026-03-15 08:20:36.897378+00', '2026-03-15 08:20:36.897378+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('17120ce6-3952-4075-b642-e67c68e4e4b5', '05693bfe-1b0f-44aa-b011-b5a49ba27910', '851714e4-676c-4f9f-9266-fb411b499797', 's256', 'tzdwj0VHikil5sghUv5vA0I0sPTal9zpuy8cK1W1tqg', 'magiclink', '', '', '2026-03-15 08:21:13.643972+00', '2026-03-15 08:21:13.643972+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('767c2701-c2a8-4d8b-98bd-fe2d70bd936a', '83bf074c-2271-4555-928e-e5f4458bf65e', 'be5b47cb-3256-45ff-ad34-529e24b2aaea', 's256', 'umsDZRuAvaZ6fNaxDlI7SrU2oe0s6Hy60O6Ar0WslwA', 'magiclink', '', '', '2026-03-15 08:26:46.616737+00', '2026-03-15 08:26:46.616737+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('1f951c6d-fe32-4bf6-ab4d-e73a51e8fd43', '83bf074c-2271-4555-928e-e5f4458bf65e', '5fea8496-b33c-4178-8477-57fc32556a18', 's256', '3oklL10wk-fUApy3LjgIA2gTTbuBT3FbtQn3W419xm8', 'magiclink', '', '', '2026-03-15 22:01:40.622125+00', '2026-03-15 22:01:40.622125+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('c5869161-3d46-4d79-9701-eacfd67e5d84', '05693bfe-1b0f-44aa-b011-b5a49ba27910', 'f367b5ad-d6fd-499c-9c41-f5da7d65f17a', 's256', 'F1kZLZnuI7rE6Nx8XkfjAzYClkvcME1-v7nR9xL0Lvs', 'magiclink', '', '', '2026-03-15 22:15:31.395871+00', '2026-03-15 22:15:31.395871+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('c8db4e97-a965-4015-8d44-5dc37e26e5c8', '83bf074c-2271-4555-928e-e5f4458bf65e', '31450c96-740c-40fb-a09e-c0e8a9fbff11', 's256', 'uuUURwvUlcGBpQartqfqqMm75fGVDgZkMBVP7nVUpPg', 'magiclink', '', '', '2026-03-15 22:16:15.320261+00', '2026-03-15 22:16:15.320261+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('0447b33a-344d-40fe-8229-6622203e00b4', '83bf074c-2271-4555-928e-e5f4458bf65e', '4b3cfeb9-960a-4e7d-8875-8a7f8e17b142', 's256', 'ED_3hwopk0UbsGQDTvhizCVR9HwXxegNXU98AtAR-k4', 'magiclink', '', '', '2026-03-15 22:40:36.778692+00', '2026-03-15 22:40:36.778692+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('004d2c84-757e-4815-9edb-d2664cee7ac5', '448847e5-d06b-4101-b587-9d74c43f2342', '63bd857a-836e-4044-934b-edbfdbf54390', 's256', 'uPz8NR5E1eT-tPZo-m0ZgPrgAdj1va6tTJgrWCNTYyE', 'magiclink', '', '', '2026-03-17 10:26:29.020469+00', '2026-03-17 10:26:29.020469+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('ee22ef54-2195-4f50-8c2f-fc149af6b12e', '448847e5-d06b-4101-b587-9d74c43f2342', '48016b09-9d3d-4dab-bf51-70ec169ee70a', 's256', '4ASFPGojfNE3-mLncqNajXMc7JOUvT9zjgWkc1-y_4I', 'magiclink', '', '', '2026-03-17 10:26:49.829914+00', '2026-03-17 10:26:49.829914+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('bf9dfcbd-b8f3-4f15-a99e-f89272d2ffc2', '448847e5-d06b-4101-b587-9d74c43f2342', 'c50467fe-07a6-4383-91c3-7c2ecb90e99a', 's256', 'w4wLlCQBq1FSchXj-I_gtkscVwuVoOilCzt--Af7-dw', 'magiclink', '', '', '2026-03-17 10:27:28.073937+00', '2026-03-17 10:27:28.073937+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('2d8bd09d-e420-428c-b580-a8f0e8f35408', '448847e5-d06b-4101-b587-9d74c43f2342', '8178ccfc-21b9-48ce-ae6e-0636e1362f39', 's256', 'ArRm7BYEEq2U3zU_gME2A4fR4V772M0zDTu2S91K1G4', 'magiclink', '', '', '2026-03-17 10:27:33.254248+00', '2026-03-17 10:27:33.254248+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('abf7eac1-4a4b-4c60-b67f-ccbd46830c22', '448847e5-d06b-4101-b587-9d74c43f2342', 'dd9d532c-4112-48ed-97a1-4bbda6a978d5', 's256', 'sJlmh6TAKEMv2KS7_ies7kJfHQrkx2AibDD4I5hAGWk', 'magiclink', '', '', '2026-03-17 17:57:09.907557+00', '2026-03-17 17:57:09.907557+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '6b6f429b-b372-466b-a961-518d767a84fe', 'authenticated', 'authenticated', 'yohann@traacks.com', '$2a$10$9pDw0kqkLWmfMrUlFkmfw.0gJuUbk5DkybJCONQlZOmBcQDsPyeM2', '2026-03-13 16:41:23.229773+00', NULL, '', NULL, 'pkce_a75509c39541b8d29d95056c6b0dc3755922c16c5ab5e5f88e957b2e', '2026-03-13 16:41:23.268971+00', '', '', NULL, '2026-03-13 16:41:23.240723+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "6b6f429b-b372-466b-a961-518d767a84fe", "email": "yohann@traacks.com", "email_verified": true, "phone_verified": false}', NULL, '2026-03-13 16:41:23.196924+00', '2026-03-13 16:41:25.802171+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '05693bfe-1b0f-44aa-b011-b5a49ba27910', 'authenticated', 'authenticated', 'yohann@traacks.fr', '$2a$10$R5D.umm3yaKyEzsLqYvUruEAxJiw6dnp2SKXL/sHsBoOhXRrynGWm', '2026-03-13 16:42:27.56609+00', NULL, '', NULL, '', '2026-03-15 22:15:31.421994+00', '', '', NULL, '2026-03-15 22:15:46.145687+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "05693bfe-1b0f-44aa-b011-b5a49ba27910", "email": "yohann@traacks.fr", "email_verified": true, "phone_verified": false}', NULL, '2026-03-13 16:42:27.548228+00', '2026-03-15 22:15:46.158786+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '448847e5-d06b-4101-b587-9d74c43f2342', 'authenticated', 'authenticated', 'jose@optistudio.co', '$2a$10$WFRgfazdWcREvJr7BC/rXuG1Qlo2blxdwAT9.emU3xxqy/EpgjBp2', '2026-03-17 10:26:28.927374+00', NULL, '', NULL, '', '2026-03-17 17:57:09.930286+00', '', '', NULL, '2026-03-17 17:57:27.555009+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "448847e5-d06b-4101-b587-9d74c43f2342", "email": "jose@optistudio.co", "email_verified": true, "phone_verified": false}', NULL, '2026-03-17 10:26:28.869272+00', '2026-03-18 08:58:08.564742+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '83bf074c-2271-4555-928e-e5f4458bf65e', 'authenticated', 'authenticated', 'yohann.mtfpro@gmail.com', '$2a$10$3bwmfb8t9/SXxn1U6xAo8ugZG8AUxLlWUmauRpm620cSd9lxijRDK', '2026-03-13 11:35:36.8201+00', NULL, '', '2026-03-13 11:33:38.870882+00', '', '2026-03-15 22:40:36.80009+00', '', '', NULL, '2026-03-15 22:40:43.444965+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "83bf074c-2271-4555-928e-e5f4458bf65e", "email": "yohann.mtfpro@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-03-13 11:09:21.245805+00', '2026-03-19 10:33:04.774706+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('83bf074c-2271-4555-928e-e5f4458bf65e', '83bf074c-2271-4555-928e-e5f4458bf65e', '{"sub": "83bf074c-2271-4555-928e-e5f4458bf65e", "email": "yohann.mtfpro@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-03-13 11:09:21.273038+00', '2026-03-13 11:09:21.273088+00', '2026-03-13 11:09:21.273088+00', 'cdd7d748-c67c-4084-8788-4cd50449bff0'),
	('6b6f429b-b372-466b-a961-518d767a84fe', '6b6f429b-b372-466b-a961-518d767a84fe', '{"sub": "6b6f429b-b372-466b-a961-518d767a84fe", "email": "yohann@traacks.com", "email_verified": false, "phone_verified": false}', 'email', '2026-03-13 16:41:23.22193+00', '2026-03-13 16:41:23.221985+00', '2026-03-13 16:41:23.221985+00', '642871a7-1b2d-4192-8ed0-93c3eef1e00d'),
	('05693bfe-1b0f-44aa-b011-b5a49ba27910', '05693bfe-1b0f-44aa-b011-b5a49ba27910', '{"sub": "05693bfe-1b0f-44aa-b011-b5a49ba27910", "email": "yohann@traacks.fr", "email_verified": false, "phone_verified": false}', 'email', '2026-03-13 16:42:27.558367+00', '2026-03-13 16:42:27.558414+00', '2026-03-13 16:42:27.558414+00', 'ff8f121e-371e-475c-a460-bcb9e9149cac'),
	('448847e5-d06b-4101-b587-9d74c43f2342', '448847e5-d06b-4101-b587-9d74c43f2342', '{"sub": "448847e5-d06b-4101-b587-9d74c43f2342", "email": "jose@optistudio.co", "email_verified": false, "phone_verified": false}', 'email', '2026-03-17 10:26:28.9053+00', '2026-03-17 10:26:28.905705+00', '2026-03-17 10:26:28.905705+00', 'aa247664-3743-4e87-873f-151126d998de');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('27fdc6e2-1568-4138-bf53-cb60b6075ce3', '6b6f429b-b372-466b-a961-518d767a84fe', '2026-03-13 16:41:23.240819+00', '2026-03-13 16:41:23.240819+00', NULL, 'aal1', NULL, NULL, 'node', '100.55.149.227', NULL, NULL, NULL, NULL, NULL),
	('2ec9ac96-62c3-4ab3-8462-fe8ed33fa7fa', '83bf074c-2271-4555-928e-e5f4458bf65e', '2026-03-15 22:16:25.756613+00', '2026-03-19 10:33:06.332507+00', NULL, 'aal1', NULL, '2026-03-19 10:33:06.3324', 'node', '13.40.134.92', NULL, NULL, NULL, NULL, NULL),
	('d8872d83-6482-408d-952d-8be6c6937934', '448847e5-d06b-4101-b587-9d74c43f2342', '2026-03-17 10:26:28.958923+00', '2026-03-17 10:26:28.958923+00', NULL, 'aal1', NULL, NULL, 'node', '98.80.198.125', NULL, NULL, NULL, NULL, NULL),
	('6321fa57-50cb-42ac-a1c8-7a2dacccc49a', '448847e5-d06b-4101-b587-9d74c43f2342', '2026-03-17 17:57:27.555486+00', '2026-03-17 17:57:27.555486+00', NULL, 'aal1', NULL, NULL, 'node', '18.215.255.172', NULL, NULL, NULL, NULL, NULL),
	('40a52c81-d10c-4c14-978d-aff8f49d851f', '83bf074c-2271-4555-928e-e5f4458bf65e', '2026-03-15 22:40:43.44583+00', '2026-03-18 00:25:45.946244+00', NULL, 'aal1', NULL, '2026-03-18 00:25:45.945709', 'node', '35.178.128.124', NULL, NULL, NULL, NULL, NULL),
	('2a25f353-30cc-4520-9c0f-e61c9b14610d', '448847e5-d06b-4101-b587-9d74c43f2342', '2026-03-17 10:27:46.186708+00', '2026-03-18 08:58:08.569784+00', NULL, 'aal1', NULL, '2026-03-18 08:58:08.568621', 'node', '13.42.54.100', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('27fdc6e2-1568-4138-bf53-cb60b6075ce3', '2026-03-13 16:41:23.254283+00', '2026-03-13 16:41:23.254283+00', 'password', '6184a3be-60ac-4576-bd40-76c84cf55316'),
	('2ec9ac96-62c3-4ab3-8462-fe8ed33fa7fa', '2026-03-15 22:16:25.764865+00', '2026-03-15 22:16:25.764865+00', 'otp', '438eaf3d-787e-4654-93ab-128ff182e2a0'),
	('40a52c81-d10c-4c14-978d-aff8f49d851f', '2026-03-15 22:40:43.459209+00', '2026-03-15 22:40:43.459209+00', 'otp', 'b4645292-3cee-44be-942d-f4828ff9cdc0'),
	('d8872d83-6482-408d-952d-8be6c6937934', '2026-03-17 10:26:28.99085+00', '2026-03-17 10:26:28.99085+00', 'password', 'f5c6536a-961a-4304-bdbb-24dbeba2f05d'),
	('2a25f353-30cc-4520-9c0f-e61c9b14610d', '2026-03-17 10:27:46.18914+00', '2026-03-17 10:27:46.18914+00', 'otp', 'daf31776-72f8-4be6-8ff7-87b3cdb4bc15'),
	('6321fa57-50cb-42ac-a1c8-7a2dacccc49a', '2026-03-17 17:57:27.5786+00', '2026-03-17 17:57:27.5786+00', 'otp', '101edb46-e70b-49b7-9358-18eb3053ce33');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") VALUES
	('1c183b4c-da45-4cf5-98e5-5e5eafb3b502', '6b6f429b-b372-466b-a961-518d767a84fe', 'recovery_token', 'pkce_a75509c39541b8d29d95056c6b0dc3755922c16c5ab5e5f88e957b2e', 'yohann@traacks.com', '2026-03-13 16:41:25.805247', '2026-03-13 16:41:25.805247');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: workspaces; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."workspaces" ("id", "name", "slug", "created_by", "created_at", "auto_join_enabled") VALUES
	('fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', 'mardi.work', 'mardiwork', '83bf074c-2271-4555-928e-e5f4458bf65e', '2026-03-13 11:36:23.967557+00', false),
	('df4d9329-fcf9-4ef8-ad25-e0045b68a806', 'Traacks', 'traacks', '83bf074c-2271-4555-928e-e5f4458bf65e', '2026-03-13 16:37:40.060262+00', false);


--
-- Data for Name: feedback_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."feedback_items" ("id", "workspace_id", "author_id", "title", "body", "category", "status", "created_at", "updated_at", "is_flagged") VALUES
	('6ef5d1b8-1b76-44c8-88fd-dab36872aa35', 'fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', '83bf074c-2271-4555-928e-e5f4458bf65e', 'What about an offsite soon? 🛫', 'I would love to meet you guys around april! Anyone agree?', 'idea', 'published', '2026-03-15 22:19:41.24889+00', '2026-03-15 22:19:41.24889+00', false),
	('d4b67a66-f475-439b-b93a-3a9317b817a6', 'fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', '83bf074c-2271-4555-928e-e5f4458bf65e', 'If anything feels wrong, this is your place to tell it!', 'This feed is here for you to tell anything and help you feel better working in our company.
Good vibes only 🫶', 'concern', 'published', '2026-03-15 22:31:31.696442+00', '2026-03-15 22:31:38.281072+00', true),
	('81cbe0ae-0fab-40ad-aad2-14ea13d02e19', 'fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', '83bf074c-2271-4555-928e-e5f4458bf65e', 'Is Rob out of his mind?', 'Sending messages @11pm wtf', 'question', 'hidden', '2026-03-15 22:20:22.515483+00', '2026-03-18 09:41:24.880037+00', false);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."comments" ("id", "workspace_id", "item_id", "author_id", "body", "status", "created_at") VALUES
	('16b2fc6a-7086-4bc1-87f0-98fe184b80f5', 'fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', '6ef5d1b8-1b76-44c8-88fd-dab36872aa35', '83bf074c-2271-4555-928e-e5f4458bf65e', 'Feel free to give any location idea!', 'published', '2026-03-15 22:20:59.8799+00');


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."forms" ("id", "workspace_id", "created_by", "title", "description", "visibility", "status", "created_at") VALUES
	('71527c14-8472-4dd3-84c8-8d184dec1690', 'fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', '83bf074c-2271-4555-928e-e5f4458bf65e', 'About the last sprint...', 'Gove your honest feedback on our last sprint', 'public', 'published', '2026-03-15 22:25:09.770438+00');


--
-- Data for Name: form_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."form_questions" ("id", "form_id", "question_text", "question_type", "options", "position", "required") VALUES
	('dc50acef-0662-4a96-af0f-32d9b68eee4a', '71527c14-8472-4dd3-84c8-8d184dec1690', 'Name something good', 'short_text', '[]', 0, true),
	('fdac937a-5aef-426f-b095-060963ab6ef8', '71527c14-8472-4dd3-84c8-8d184dec1690', 'Name something bad', 'short_text', '[]', 1, true),
	('7512f5a9-a95e-4fa3-b146-ccf309440a78', '71527c14-8472-4dd3-84c8-8d184dec1690', 'Describe how you would have done it if you were in charge', 'long_text', '[]', 2, true),
	('7cc544bc-ffbe-4e1b-94aa-1f40c8863e3e', '71527c14-8472-4dd3-84c8-8d184dec1690', 'How confident are you about the release?', 'rating', '[]', 3, true),
	('d597e890-aa4b-4d3c-a20f-1a7614795fcc', '71527c14-8472-4dd3-84c8-8d184dec1690', 'What helped you move quickly?', 'multiple_choice', '["Team communication", "Management", "A lot of AI"]', 4, true),
	('fcd85c93-53b1-46ea-a7d9-ae9f799e8839', '71527c14-8472-4dd3-84c8-8d184dec1690', 'Pick the number 1 culprit from this sprint', 'single_choice', '["Not enough time", "Too much pressure"]', 5, true);


--
-- Data for Name: form_responses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."form_responses" ("id", "form_id", "respondent_id", "created_at") VALUES
	('28ffbe05-7ace-45d8-97a9-dc9b141bfcd0', '71527c14-8472-4dd3-84c8-8d184dec1690', '83bf074c-2271-4555-928e-e5f4458bf65e', '2026-03-15 22:26:23.576055+00'),
	('1c90c0ef-176e-434a-b667-0fa6f8c0fdf3', '71527c14-8472-4dd3-84c8-8d184dec1690', '448847e5-d06b-4101-b587-9d74c43f2342', '2026-03-18 09:14:50.520899+00');


--
-- Data for Name: form_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."form_answers" ("id", "response_id", "question_id", "answer_value") VALUES
	('4098c308-7189-471f-8bb5-107f1a7f4330', '28ffbe05-7ace-45d8-97a9-dc9b141bfcd0', 'dc50acef-0662-4a96-af0f-32d9b68eee4a', 'Blabla...'),
	('735383df-f46a-4b3f-832e-2867b77476df', '28ffbe05-7ace-45d8-97a9-dc9b141bfcd0', 'fdac937a-5aef-426f-b095-060963ab6ef8', 'Blabla but bad...'),
	('8bbd94f9-d565-4d2e-8a6c-e36ab1891c3d', '28ffbe05-7ace-45d8-97a9-dc9b141bfcd0', '7512f5a9-a95e-4fa3-b146-ccf309440a78', 'A long response goes here'),
	('c8c9d64d-92ad-4079-b686-790024a17b07', '28ffbe05-7ace-45d8-97a9-dc9b141bfcd0', '7cc544bc-ffbe-4e1b-94aa-1f40c8863e3e', '4'),
	('2f1a4ba5-da84-4e16-9f2f-d3b3519d9621', '28ffbe05-7ace-45d8-97a9-dc9b141bfcd0', 'd597e890-aa4b-4d3c-a20f-1a7614795fcc', 'Team communication|||A lot of AI'),
	('e22433fc-4bd6-4414-8c2a-dd40379a97de', '28ffbe05-7ace-45d8-97a9-dc9b141bfcd0', 'fcd85c93-53b1-46ea-a7d9-ae9f799e8839', 'Too much pressure'),
	('fd452de2-aea9-467d-8065-6053fae3a2ad', '1c90c0ef-176e-434a-b667-0fa6f8c0fdf3', 'dc50acef-0662-4a96-af0f-32d9b68eee4a', 'enc:MqtXnOk2MqQOQCAf:m9Nl82+0Ao9ruUD9QJiIAg==:uTko61USwyIDlgE='),
	('1b486455-375c-477a-a59e-4b2d59498113', '1c90c0ef-176e-434a-b667-0fa6f8c0fdf3', 'fdac937a-5aef-426f-b095-060963ab6ef8', 'enc:y0z3nctJ6aUmat6X:l8wLyvaS5ezjA3/AWlWsNA==:c4E6x+PN6794Eg=='),
	('77e722c4-f05e-40e2-a224-816413afdda0', '1c90c0ef-176e-434a-b667-0fa6f8c0fdf3', '7512f5a9-a95e-4fa3-b146-ccf309440a78', 'enc:zM3r48H6z7ic64S2:Z2dDOM9vt+sUCNOouuf1kg==:W0y6a4Oy6ivCOva6Y5hwIhyO5TcNw3yZiSA='),
	('c82845d8-ce40-44d2-8600-a20b14fb7ec8', '1c90c0ef-176e-434a-b667-0fa6f8c0fdf3', '7cc544bc-ffbe-4e1b-94aa-1f40c8863e3e', 'enc:YW1JReduai3ukECU:/BNS2VPK9lwL7Hx+bMPduA==:kg=='),
	('ccf142d3-088a-466c-b633-b7a97541d1a2', '1c90c0ef-176e-434a-b667-0fa6f8c0fdf3', 'd597e890-aa4b-4d3c-a20f-1a7614795fcc', 'enc:GpH98iflY1uHMmkt:QYsKztz+wnDkKNYAYGlGDQ==:KYIFRPjDDk5yw8x9doRLo+8/'),
	('61408bb6-b523-4965-8149-e9f8bf24632a', '1c90c0ef-176e-434a-b667-0fa6f8c0fdf3', 'fcd85c93-53b1-46ea-a7d9-ae9f799e8839', 'enc:WldIfXV0l0TH/mtk:EdHQwJ2swNMiZLm8rJpG7w==:Z0BaP2RpcnCVyzcBXsGp');


--
-- Data for Name: reactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."reactions" ("id", "workspace_id", "target_type", "target_id", "user_id", "emoji", "created_at") VALUES
	('8a170eed-3f83-4f58-b8f8-722cb1f7f451', 'fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', 'item', '6ef5d1b8-1b76-44c8-88fd-dab36872aa35', '83bf074c-2271-4555-928e-e5f4458bf65e', '❤️', '2026-03-15 22:21:17.916306+00'),
	('3663761b-47eb-4ba8-915b-009b1de9e9bf', 'fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', 'item', '81cbe0ae-0fab-40ad-aad2-14ea13d02e19', '448847e5-d06b-4101-b587-9d74c43f2342', '👀', '2026-03-17 10:34:53.216974+00'),
	('363443ac-8769-408b-bc96-f28d9a9fcb81', 'fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', 'item', '6ef5d1b8-1b76-44c8-88fd-dab36872aa35', '448847e5-d06b-4101-b587-9d74c43f2342', '❤️', '2026-03-17 10:35:23.627313+00');


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."reports" ("id", "workspace_id", "target_type", "target_id", "reporter_id", "reason", "status", "created_at") VALUES
	('a928c969-db10-4194-aa85-6264c4cc9706', 'fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', 'item', '81cbe0ae-0fab-40ad-aad2-14ea13d02e19', '448847e5-d06b-4101-b587-9d74c43f2342', 'This is a false accusation', 'resolved', '2026-03-18 09:41:02.050723+00');


--
-- Data for Name: workspace_domains; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workspace_invites; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."workspace_invites" ("id", "workspace_id", "token_hash", "role", "created_by", "created_at", "expires_at", "used_at", "used_by", "status", "token") VALUES
	('a0d1042e-bab8-45ec-b1db-7c1fda76c536', 'df4d9329-fcf9-4ef8-ad25-e0045b68a806', '40914ca4498d3be81da1098448860b6a02fe916ae094a3424b4e12b165f426f3', 'member', '83bf074c-2271-4555-928e-e5f4458bf65e', '2026-03-13 16:41:06.368291+00', '2026-03-20 16:41:06.298+00', '2026-03-13 16:43:02.106+00', '05693bfe-1b0f-44aa-b011-b5a49ba27910', 'used', '1e92933d2bbaeccc5ed8716d0511686592671121b89c3a8164f33842eef4d6e3'),
	('3a044c46-dd9f-4f57-b5be-3d3de07699e0', 'fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', '48f32504e987f15cfa2861c78381c63f3b8cbd7f02843e15dfc644e8ad452c82', 'member', '83bf074c-2271-4555-928e-e5f4458bf65e', '2026-03-15 08:20:59.951997+00', '2026-03-22 08:20:59.889+00', '2026-03-15 08:21:54.626+00', '05693bfe-1b0f-44aa-b011-b5a49ba27910', 'used', 'a0100b04e3d6768b3d69cb34a5ac463c7fc90c180e670734f9c7f1896f371e8e'),
	('cc6a100f-003c-4951-82e8-5a3eea25523f', 'fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', '42e51638e73dd7ab780b49ac057b30bda2ff218f82e2090f2018670eba30ede2', 'admin', '83bf074c-2271-4555-928e-e5f4458bf65e', '2026-03-15 22:27:09.804995+00', '2026-03-22 22:27:09.725+00', '2026-03-17 10:27:52.042+00', '448847e5-d06b-4101-b587-9d74c43f2342', 'used', '36405fde61b10d7812a0aae19477b779315fc2ccfb299dc48aadb1351c66667f');


--
-- Data for Name: workspace_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."workspace_members" ("workspace_id", "user_id", "role", "status", "joined_at") VALUES
	('df4d9329-fcf9-4ef8-ad25-e0045b68a806', '83bf074c-2271-4555-928e-e5f4458bf65e', 'member', 'active', '2026-03-13 16:37:40.260208+00'),
	('df4d9329-fcf9-4ef8-ad25-e0045b68a806', '05693bfe-1b0f-44aa-b011-b5a49ba27910', 'owner', 'active', '2026-03-13 16:43:02.03164+00'),
	('fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', '05693bfe-1b0f-44aa-b011-b5a49ba27910', 'member', 'active', '2026-03-15 08:21:54.562639+00'),
	('fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', '83bf074c-2271-4555-928e-e5f4458bf65e', 'owner', 'active', '2026-03-13 11:36:24.430719+00'),
	('fac885d4-69e7-48f6-afc3-4e5a33cf2f0b', '448847e5-d06b-4101-b587-9d74c43f2342', 'admin', 'active', '2026-03-17 10:27:51.985898+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 37, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict TBN81dIx8PPZ5J5s6w0jgQCpokGWXgUv1GxM4tM3pbDYV9dpI94a8808EEBGICN

RESET ALL;
