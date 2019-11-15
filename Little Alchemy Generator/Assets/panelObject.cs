using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using TMPro;

public class panelObject : MonoBehaviour, IDragHandler, IEndDragHandler
{
    public GameObject parent;
    public string name;
    private GameObject newElement;
    public void OnDrag(PointerEventData eventData)
    {
        if (newElement == null)
        {
            newElement = Instantiate(gameObject);
            newElement.transform.parent = parent.transform;
            newElement.AddComponent<dragAndDrop>();
            Destroy(newElement.GetComponent<panelObject>());
            //Destroy(newElement.transform.GetChild(0).gameObject, 0.5f);
        }
        newElement.transform.position = Input.mousePosition;
    }
    public void OnEndDrag(PointerEventData eventData)
    {
        newElement = null;
    }

    // Start is called before the first frame update
    void Start()
    {
        transform.parent.gameObject.GetComponent<TextMeshProUGUI>().text = name;
    }
}
