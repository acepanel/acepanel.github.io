# Monitoring Settings and Notifications

![Monitoring settings and notifications](/images/monitor/setting.png)

Open **Monitoring > Settings** to configure monitoring retention, SMTP notification channels, and system-event notifications. Alert thresholds themselves are managed on the [Alerts](./alert) page.

## SMTP Channels

AcePanel sends alert and event notifications through SMTP channels. Each channel contains:

- name and enabled status;
- SMTP host and port;
- security mode: SSL/TLS (commonly port 465), STARTTLS (commonly port 587), or no transport encryption (commonly port 25);
- account and password;
- sender address and sender name;
- one or more recipients;
- optional TLS-certificate verification bypass.

Use **Test** after saving. A successful test confirms delivery at that moment; it does not guarantee that later mail will bypass spam filtering.

::: warning TLS verification
Disabling TLS verification permits a machine-in-the-middle attack and should be limited to a controlled network with a separately verified mail server.
:::

## System Events

Channels can receive 11 event types:

1. certificate renewal failure;
2. backup failure;
3. background task failure;
4. scheduled-task failure;
5. website expiration;
6. tamper-protection interception;
7. panel health warning;
8. successful panel login;
9. repeated failed panel logins;
10. SSH login;
11. SSH brute-force activity.

Select security-sensitive login events carefully: they can be frequent on an exposed server. Use a mailbox and retention policy appropriate for operational security logs.

## Relationship to Alerts

System events are emitted by a concrete panel action or security condition. Alert rules are periodic metric evaluations. Both can use the same SMTP channel, but enabling an event does not create a metric rule and creating a rule does not automatically enable the corresponding system event.

## Troubleshooting Delivery

- Verify DNS, outbound firewall rules, SMTP host and port, transport mode, account, and sender policy.
- Check whether the provider requires an application password rather than the normal mailbox password.
- Review the test result before attaching the channel to many rules.
- If panel health or task failure messages are missing, confirm that the event type and the channel are both enabled.
- Never place SMTP passwords in screenshots, public issue reports, or copied diagnostic logs.
