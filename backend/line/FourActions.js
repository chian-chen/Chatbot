
const FourActions = (acts) => {

    return {
      "type": "flex",
      "altText": "This is a Flex Message",
      "contents": {
        "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "size": "mega",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[0]['act1'],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[0]['act1'],
                        "text": acts[0]['act1']
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm"
                },
                {
                  "type": "separator",
                  "color": "#31666b",
                  "margin": "md"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[0]['act2'],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[0]['act2'],
                        "text": acts[0]['act2']
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm",
                  "offsetTop": "md"
                }
              ],
              "margin": "none",
              "spacing": "none",
              "borderWidth": "none",
              "cornerRadius": "none",
              "paddingAll": "xl",
              "paddingBottom": "xxl",
              "paddingTop": "lg",
              "backgroundColor": "#eeeeee"
            }
          },
          {
            "type": "bubble",
            "size": "mega",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[0]['act3'],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[0]['act3'],
                        "text": acts[0]['act3'],
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm"
                },
                {
                  "type": "separator",
                  "color": "#31666b",
                  "margin": "md"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[0]['act4'],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[0]['act4'],
                        "text": acts[0]['act4']
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm",
                  "offsetTop": "md"
                }
              ],
              "margin": "none",
              "spacing": "none",
              "borderWidth": "none",
              "cornerRadius": "none",
              "paddingAll": "xl",
              "paddingBottom": "xxl",
              "paddingTop": "lg",
              "backgroundColor": "#eeeeee"
            }
          }
        ]
      }
    };
};

export default FourActions;